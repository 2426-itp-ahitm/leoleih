import {Component, inject, OnInit} from '@angular/core';
import {NgForOf, DatePipe} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpService} from '../http.service';
import {ReservationService} from '../reservation.service';
import {ReservationDTO, Room} from '../interfaces';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {LocalStorageService} from '../local-storage.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-room-reservation',
  providers: [provideNativeDateAdapter()],
  imports: [
    NgForOf,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatDatepickerModule,
    DatePipe,
  ],
  templateUrl: './room-reservation.component.html',
  styleUrl: './room-reservation.component.css'
})
export class RoomReservationComponent implements OnInit {
  times: string[] = [
    '7:00', '8:00', '8:55', '10:00', '10:55', '11:50', '12:45',
    '13:40', '14:35', '15:30', '16:25', '17:20', '18:15', '19:10'
  ];
  httpService: HttpService = inject(HttpService);
  router = inject(Router)
  storageService: LocalStorageService = inject(LocalStorageService);
  private snackBar = inject(MatSnackBar);

  currentWeekStart: Date = new Date();
  weekDays: Date[] = [];

  selectedDate: Date = new Date();

  rooms: Room[] = [];
  currentRoom?: Room = undefined;

  selectedCells: { [key: string]: string } = {};
  isDragging: boolean = false;
  startCell: { rowIndex: number, colIndex: number } | null = null;
  endCell: { rowIndex: number, colIndex: number } | null = null;

  colors: string[] = ['#ffcccc', '#ccffcc', '#ccccff', '#ffffcc'];

  reservationService: ReservationService = inject(ReservationService);

  ngOnInit() {
    this.currentWeekStart = this.getStartOfWeek(new Date());
    this.updateWeekDays();

    this.httpService.getAllRooms().subscribe(r => {
      this.rooms = r;
      if (this.rooms.length > 0) {
        this.currentRoom = this.rooms[0];
      }
    });
  }

  setRoom(room: Room) {
    this.currentRoom = room;
  }

  getStartOfWeek(date: Date): Date {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(new Date(date).setDate(diff));
  }

  updateWeekDays(): void {
    this.weekDays = [];
    for (let i = 0; i < 5; i++) {
      const day = new Date(this.currentWeekStart);
      day.setDate(day.getDate() + i);
      this.weekDays.push(day);
    }
  }

  onDateChange(selectedDate: Date | null): void {
    if (selectedDate) {
      this.selectedDate = selectedDate;
      this.currentWeekStart = this.getStartOfWeek(selectedDate);
      this.updateWeekDays();
    }
  }

  onMouseDown(rowIndex: number, colIndex: number, event: MouseEvent): void {
    event.preventDefault();
    this.isDragging = true;
    this.startCell = { rowIndex, colIndex };
    this.endCell = { rowIndex, colIndex };
    this.selectCellsInRange();
  }

  onMouseMove(rowIndex: number, colIndex: number): void {
    if (this.isDragging) {
      this.endCell = { rowIndex, colIndex };
      this.selectCellsInRange();
    }
  }

  onMouseUp(event: MouseEvent): void {
    this.isDragging = false;
    this.startCell = null;
    this.endCell = null;
  }

  selectCellsInRange(): void {
    if (!this.startCell || !this.endCell) return;

    const startRow = Math.min(this.startCell.rowIndex, this.endCell.rowIndex);
    const endRow = Math.max(this.startCell.rowIndex, this.endCell.rowIndex);
    const startCol = Math.min(this.startCell.colIndex, this.endCell.colIndex);
    const endCol = Math.max(this.startCell.colIndex, this.endCell.colIndex);

    for (let r = startRow; r <= endRow; r++) {
      for (let c = startCol; c <= endCol; c++) {
        const key = `${r}-${c}`;
        if (this.selectedCells[key]) {
          delete this.selectedCells[key];
        } else {
          this.selectedCells[key] = this.colors[0];
        }
      }
    }
  }

  getCellColor(rowIndex: number, colIndex: number): string {
    return this.selectedCells[`${rowIndex}-${colIndex}`] || 'transparent';
  }

  onCellClick(rowIndex: number, colIndex: number): void {
    const key = `${rowIndex}-${colIndex}`;
    if (this.selectedCells[key]) {
      delete this.selectedCells[key];
    } else {
      this.selectedCells[key] = this.colors[0];
    }
    this.selectedDate = this.weekDays[colIndex];
  }

  addReservation() {
    if (!this.currentRoom) return;

    const selectedKeys = Object.keys(this.selectedCells);
    if (selectedKeys.length === 0) return;

    const firstKey = selectedKeys[0];
    const [firstRow, firstCol] = firstKey.split('-').map(Number);

    let minRow = firstRow;
    let maxRow = firstRow;
    let col = firstCol;

    selectedKeys.forEach(key => {
      const [r, c] = key.split('-').map(Number);
      if (c === col) {
        minRow = Math.min(minRow, r);
        maxRow = Math.max(maxRow, r);
      }
    });

    const startTimeParts = this.times[minRow].split(':');
    const endTimeParts = this.times[maxRow].split(':');

    const reservationDate = this.weekDays[col];

    const start = new Date(reservationDate);
    start.setHours(parseInt(startTimeParts[0]), parseInt(startTimeParts[1]), 0, 0);

    const end = new Date(reservationDate);
    end.setHours(parseInt(endTimeParts[0]), parseInt(endTimeParts[1]), 0, 0);

    const reservation: ReservationDTO = {
      roomId: this.currentRoom.id,
      personId: 1, // Placeholder
      reservationDate: reservationDate.toISOString(),
      startTime: start.toISOString(),
      endTime: end.toISOString()
    };

    this.storageService.addRoomDTO(reservation);
    this.snackBar.open('Raum reserviert', 'Schließen');
    this.router.navigate(['cart']);
  }
}
