import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
import {MatTableModule, MatTable, MatTableDataSource} from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import {HttpService} from '../http.service';
import {CommonModule, DatePipe, NgForOf, NgIf} from '@angular/common';
import {Equipment, Rental} from '../interfaces';
import {map} from 'rxjs';
import {format} from 'date-fns';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {UserService} from '../user.service';
import {RouterLink} from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    RouterLink
  ],
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DashboardComponent implements OnInit {
  httpService: HttpService = inject(HttpService)
  rentals: Rental[] = [];
  dataSource = new MatTableDataSource<Rental>([]);
  expandedElement: Rental | null = null;
  equipments: Equipment[] = [];

  displayedColumns: string[] = ["name", "grade", "email", "date", "status", "actions"];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.httpService.getAllRentals()
      .pipe(map(rentals => rentals.filter((rental: Rental) => !(rental.isRented && rental.isReturned))))
      .subscribe(filteredRentals => {
        this.rentals = filteredRentals;
        this.dataSource.data = this.rentals;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(filteredRentals);

        // Custom filter for nested objects if needed, but MatTableDataSource handles simple ones well.
        this.dataSource.sortingDataAccessor = (item, property) => {
          if (!item.person) return '';
          switch (property) {
            case 'name':
              return `${item.person.surname ?? ''} ${item.person.firstname ?? ''}`.toLowerCase();
            case 'grade':
              return item.person.grade?.toLowerCase() ?? '';
            case 'email':
              return item.person.email?.toLowerCase() ?? '';
            case 'date':
              return new Date(item.leaseDate).getTime();
            default:
              return (item as any)[property];
          }
        };

      });
  }

  toggleRow(element: Rental) {
    if (this.expandedElement === element) {
      this.expandedElement = null;
    } else {
      this.expandedElement = element;
      this.getEquipmentOfRentalRequest(element);
    }
  }

  getEquipmentOfRentalRequest(rental: Rental): void {
    this.httpService.getEquipmentByPersonId(rental?.person?.id)?.subscribe(r => {
      this.equipments = r;
    });
  }

  getOpenReturnsCount(): number {
    return this.rentals.filter(r => r.isRented && !r.isReturned).length;
  }

  getExpiredRentalsCount(): number {
    return this.rentals.filter(r => this.isRentalExpired(r)).length;
  }

  isRentalExpired(rental: Rental): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const returnDate = new Date(rental.returnDate);
    returnDate.setHours(0, 0, 0, 0);
    return returnDate < today;
  }

  showAll() {
    this.dataSource.data = this.rentals;
  }

  filterExpired() {
    this.dataSource.data = this.rentals.filter(r => this.isRentalExpired(r));
  }

  filterOpen() {
    this.dataSource.data = this.rentals.filter(r => r.isRented && !r.isReturned);
  }

  removeRental(event: Event, rental: Rental) {
    event.stopPropagation();
    this.rentals = this.rentals.filter(r => r.person?.id !== rental.person?.id);
    this.dataSource.data = this.rentals;
  }

  formatDate(date: string) {
    return format(new Date(date), 'dd.MM.yy');
  }
}
