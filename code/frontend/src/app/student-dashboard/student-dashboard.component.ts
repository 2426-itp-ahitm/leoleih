import {Component, inject, OnInit} from '@angular/core';
import {DatePipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {Equipment, Rental, ReservationDTO} from '../interfaces';
import {HttpService} from '../http.service';
import {RoomItemComponent} from '../room-item/room-item.component';
import {ReservationService} from '../reservation.service';
import {UserService} from '../user.service';

@Component({
  selector: 'app-student-dashboard',
  imports: [
    NgForOf,
    RoomItemComponent,
    NgClass,
    DatePipe
  ],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.css'
})
export class StudentDashboardComponent implements OnInit {
  tableHeaders: string[] =  ["Img", "Name", "Typ", "Anzahl"]
  tableEquipment: Equipment[] = [];
  rentals: Rental[] = [];
  httpService: HttpService = inject(HttpService);
  userService: UserService = inject(UserService);
  reservationService: ReservationService = inject(ReservationService);
  reservations: ReservationDTO[] = [];

  ngOnInit() {

    this.httpService.getRentalByUserId(this.userService.getUser()?.id!).subscribe(
      rentals => {
        rentals.forEach(rental => {
          this.rentals.push(rental);
          rental.equipmentIds.forEach(eqId => {
            this.httpService.getEquipmentById(eqId).subscribe(
              equipment => {
                this.tableEquipment.push(equipment);
              }
            )
          })
        })
      }
    )

    this.reservationService.reservations.subscribe(reservation => {
      this.reservations = reservation;
    })
  }
}
