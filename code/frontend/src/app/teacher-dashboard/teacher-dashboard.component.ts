import {AfterViewInit, ChangeDetectorRef, Component, inject, OnInit, ViewChild} from '@angular/core';
import {MatTableModule, MatTable, MatTableDataSource} from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import {filter, forkJoin, map, switchMap} from 'rxjs';
import {Equipment, Person, Rental} from '../interfaces';
import {HttpService} from '../http.service';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatChip} from '@angular/material/chips';
import {MatIcon} from '@angular/material/icon';
import {ActivatedRoute, NavigationEnd, Router, RouterLink} from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrl: './teacher-dashboard.component.css',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, DatePipe, MatButton, MatChip, NgForOf, NgIf],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms ease-in-out'))
    ])
  ]
})
export class TeacherDashboardComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  router: Router = inject(Router);
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  httpService: HttpService = inject(HttpService)
  rentals: Rental[] = [];
  dataSource = new MatTableDataSource<Rental>([]);
  expandedElement: Rental | null = null;
  equipments: Equipment[] = [];
  person: Person | null = null;
  cdr = inject(ChangeDetectorRef);

  displayedColumns: string[] = ["name", "grade", "email", "date", "status", "actions"];
//TODO buttoms im html hinzufügen zum ändern vom status
//TODO detail reparieren
//TODO Klassenansicht (wenn vom backend her realisierbar)
//TODO notiz hinzufügen können als lehrer

  ngOnInit() {
    this.cdr.detectChanges();
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => {
        this.loadRentals();
      });
  }
  loadRentals() {
    this.httpService.getAllRentals()
      .pipe(
        map(rentals =>
          rentals.filter(r =>
            !(r.isRented && r.isReturned) && r.personId != null
          )
        ),
        switchMap(rentals =>
          forkJoin(
            rentals.map(rental =>
              this.httpService.getPersonById(rental.personId).pipe(
                map(person => ({...rental, person}))
              )
            )
          )
        )
      )
      .subscribe(rentalsWithPerson => {
        this.rentals = rentalsWithPerson;
        this.dataSource.data = rentalsWithPerson;
      });
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
    this.httpService.getAllRentals()
        .pipe(
            map(rentals =>
                rentals.filter(r =>
                    !(r.isRented && r.isReturned) && r.personId != null
                )
            ),
            switchMap(rentals =>
                forkJoin(
                    rentals.map(rental =>
                        this.httpService.getPersonById(rental.personId).pipe(
                            map(person => ({
                              ...rental,
                              person
                            }))
                        )
                    )
                )
            )
        )
        .subscribe(rentalsWithPerson => {
          this.rentals = rentalsWithPerson;
          this.dataSource.data = rentalsWithPerson;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

          this.dataSource.sortingDataAccessor = (item, property) => {
            switch (property) {
              case 'name':
                return `${item?.person?.surname} ${item?.person?.firstname}`.toLowerCase();
              case 'grade':
                return item?.person?.grade.toLowerCase();
              case 'email':
                return item?.person?.email.toLowerCase();
              case 'date':
                return new Date(item.leaseDate).getTime();
              default:
                return (item as any)[property];
            }
          };
        });
    console.log("Hallo")
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
  isRentalExpired(rental: Rental): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const returnDate = new Date(rental.returnDate);
    returnDate.setHours(0, 0, 0, 0);
    return returnDate < today;
  }
  removeRental(event: Event, rental: Rental) {
    event.stopPropagation();
    this.rentals = this.rentals.filter(r => r.person?.id !== rental.person?.id);
    this.dataSource.data = this.rentals;
  }

  protected readonly console = console;

  navToSettings(id:number) {
    this.router.navigate(['settings'], {
      relativeTo: this.activatedRoute,
      state: { id:id }
    });

  }
}
