import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Equipment, Person, Rental, RentalRequest, Room} from './interfaces';
import {LocalStorageService} from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private http: HttpClient = inject(HttpClient);
  storageService: LocalStorageService = inject(LocalStorageService);
  private URL: string = 'http://localhost:8080/api/';
  //private URL: string = 'http://localhost:8080/api/';
  equipments: Equipment[] = [];

  // Get all equipments
  fetchAllVotes() {
    return this.http.get<Equipment[]>(`${this.URL}equipment/list`);
  }

  // Get Equipments by ID
  getEquipmentById(id: number): Observable<Equipment> {
    return this.http.get<Equipment>(`${this.URL}equipment/${id}`);
  }
  getRentalById(id: number): Observable<Rental> {
    console.log(`${this.URL}rental/${id}`);
    return this.http.get<Rental>(`${this.URL}rental/${id}`);
  }

  // Get all rentals
  getAllRentals() {
    //return this.http.get<Rental[]>(this.URL + "rental/list");
    return this.http.get<Rental[]>(`${this.URL}rental/list`);
  }

  postRentalDTO(rental: RentalRequest): Observable<RentalRequest> {
    console.log(rental)
    return this.http.post<RentalRequest>(`${this.URL}rental`, rental);
  }

  getEquipmentByPersonId(id: number | undefined): Observable<Equipment[]> | undefined {
    return this.http.get<Equipment[]>(`${this.URL}equipment/user/${id}`);
  }

  getAllPersons() {
    return this.http.get<Person[]>(`${this.URL}persons/list`);
  }

  getPersonById(id: number): Observable<Person> {
    return this.http.get<Person>(`${this.URL}persons/${id}`);
  }
  getAllRooms() {
    return this.http.get<Room[]>(`${this.URL}rooms/list`);
  }
  updateRental(rental: Rental | null){
    console.log(rental)
    this.http.put(`${this.URL}rental/update`, rental)
  }

  constructor() {
  }
}
