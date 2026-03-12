import {Component, inject, OnInit} from '@angular/core';
import {DatePipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {Equipment, Rental, ReservationDTO} from '../interfaces';
import {HttpService} from '../http.service';
import {RoomItemComponent} from '../room-item/room-item.component';
import {ReservationService} from '../reservation.service';
import {UserService} from '../user.service';
import {MatListItem} from '@angular/material/list';
import {forkJoin} from 'rxjs';

@Component({
  selector: 'app-student-dashboard',
  imports: [
    NgForOf,
    RoomItemComponent,
    NgClass,
    DatePipe,
    NgIf
  ],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.css'
})
export class StudentDashboardComponent implements OnInit {
  tableHeaders: string[] =  ["Img", "Name", "Typ", "Anzahl"]
  tableEquipment: { [rentalId: number]: (Equipment & { count: number })[] } = {};
  rentals: Rental[] = [];
  index: number = 0;
  httpService: HttpService = inject(HttpService);
  userService: UserService = inject(UserService);
  reservationService: ReservationService = inject(ReservationService);
  reservations: ReservationDTO[] = [];
  expandedRows: { [id: number]: boolean } = {};


  ngOnInit() {
    this.httpService.getRentalByUserId(this.userService.getUser()?.id!).subscribe(
      rentals => {
        rentals.forEach(rental => {
          this.rentals.push(rental);
          this.tableEquipment[rental.id] = [];

          const requests = rental.equipmentIds.map(id => this.httpService.getEquipmentById(id));

          rentals.forEach(rental => {
            this.rentals.push(rental);
            this.tableEquipment[rental.id] = [];

            const requests = rental.equipmentIds.map(id => this.httpService.getEquipmentById(id));
            forkJoin(requests).subscribe(equipmentList => {
              this.tableEquipment[rental.id] = equipmentList.map(e => ({ ...e, count: 1 }));
            });
          });
        });
      }
    )

    this.reservationService.reservations.subscribe(reservation => {
      this.reservations = reservation;
    })
    console.log(this.rentals);
  }
}
