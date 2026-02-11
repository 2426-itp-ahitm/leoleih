import { AfterViewInit, ChangeDetectorRef, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatTableModule, MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { filter, forkJoin, map, switchMap } from 'rxjs';
import { Equipment, Person, Rental } from '../interfaces';
import { HttpService } from '../http.service';
import { DatePipe, NgForOf, NgIf } from '@angular/common';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatChip } from '@angular/material/chips';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrl: './teacher-dashboard.component.css',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    DatePipe,
    MatButton,
    MatChip,
    NgForOf,
    NgIf,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    MatIcon
  ],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms ease-in-out'))
    ])
  ]
})
export class TeacherDashboardComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private httpService = inject(HttpService);
  private cdr = inject(ChangeDetectorRef);

  rentals: Rental[] = [];
  dataSource = new MatTableDataSource<Rental>([]);
  expandedElement: Rental | null = null;
  equipments: Equipment[] = [];

  topStatus: string = 'verspätet';
  displayedColumns: string[] = ["name", "grade", "email", "date", "status", "actions"];

  ngOnInit() {
    this.setupSortingAccessor();
    this.loadRentals();
    
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => {
        this.loadRentals();
      });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  setupSortingAccessor() {
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'name':
          return `${item?.person?.surname ?? ''} ${item?.person?.firstname ?? ''}`.toLowerCase();
        case 'grade':
          return item?.person?.grade?.toLowerCase() ?? '';
        case 'email':
          return item?.person?.email?.toLowerCase() ?? '';
        case 'date':
          return new Date(item.leaseDate).getTime();
        case 'status':
          const priorities = [
            this.topStatus.toLowerCase(),
            'verspätet',
            'ausstehend',
            'reserviert',
            'ausgeborgt',
            'zurückgegeben'
          ];

          const currentStatus = this.isRentalExpired(item)
            ? 'verspätet'
            : (item.state ?? '').toLowerCase();

          const rank = priorities.indexOf(currentStatus);
          const returnDate = new Date(item.returnDate).getTime();

          return (rank === -1 ? 99 : rank) * 1000000000000 + returnDate;
        default:
          return (item as any)[property];
      }
    };
  }

  loadRentals() {
    this.httpService.getAllRentals()
      .pipe(
        map(rentals => rentals.filter(r => !(r.isRented && r.isReturned) && r.personId != null)),
        switchMap(rentals =>
          forkJoin(
            rentals.map(rental =>
              this.httpService.getPersonById(rental.personId).pipe(
                map(person => ({ ...rental, person }))
              )
            )
          )
        )
      )
      .subscribe(rentalsWithPerson => {
        this.rentals = rentalsWithPerson;
        this.dataSource.data = rentalsWithPerson;
        this.cdr.detectChanges();
      });
  }
  updateSorting() {
    if (this.dataSource.sort) {
      const active = this.dataSource.sort.active;
      const direction = this.dataSource.sort.direction;


      this.dataSource.data = [...this.rentals];

      this.dataSource.sort.sortChange.emit({ active, direction });
    }
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
    if (rental?.person?.id) {
      this.httpService.getEquipmentByPersonId(rental.person.id)?.subscribe(r => {
        this.equipments = r;
      });
    }
  }

  isRentalExpired(rental: Rental): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const returnDate = new Date(rental.returnDate);
    returnDate.setHours(0, 0, 0, 0);
    return returnDate < today;
  }

  navToSettings(id: number) {
    this.router.navigate(['settings'], {
      relativeTo: this.activatedRoute,
      state: { id: id }
    });
  }}
