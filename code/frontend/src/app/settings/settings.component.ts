import {Component, inject, OnInit} from '@angular/core';

import {ReactiveFormsModule, FormBuilder, Validators, FormGroup} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import {HttpService} from "../http.service";
import {Equipment, Rental} from '../interfaces';
import {Router} from '@angular/router';
import {NgForOf} from '@angular/common';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    NgForOf
  ]
})

export class SettingsComponent implements OnInit {

  private httpService: HttpService = inject(HttpService);
  private router: Router = inject(Router);
  private state: string = 'AUSSTEHEND';
  private notiz: string = '';
  protected rental: Rental | null = null;
  public addressForm!: FormGroup ;
  protected equipments: Equipment[] = [];
  private fb = inject(FormBuilder);


  ngOnInit() {
    this.addressForm = this.fb.group({
      notiz: ['', Validators.required],
      state: ['', Validators.required]
    });

    this.httpService.getRentalById(history.state.id).subscribe(rental => {
      this.rental = rental;
      this.addressForm.patchValue({
        notiz: this.rental.note,
        state: this.rental.state,
      });
      for (let i = 0; i < this.rental.equipmentIds.length; i++) {
        this.httpService.getEquipmentById(this.rental.equipmentIds[i]).subscribe(equipment => {
          this.equipments.push(equipment);
          }
        );
      }
    });
  }
  hasUnitNumber = false;

  states = [
    "AUSGEBORGT",
    "RESERVIERT",
    "ZURÜCKGEGEBEN",
    "ÜBERZOGEN",
    "AUSSTEHEND"
  ];

  onSubmit(): void {
    if (!this.rental) return;

    this.rental.note = this.addressForm?.value.notiz!;
    this.rental.state = this.addressForm?.value.state!;
    console.log(this.rental);
    console.log("^^^^^^^^^^");
    this.httpService.updateRental(this.rental).subscribe();
    this.router.navigate(['dashboard']);
  }
}
