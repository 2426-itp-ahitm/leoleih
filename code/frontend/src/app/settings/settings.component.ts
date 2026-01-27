import { Component, inject } from '@angular/core';

import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';


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
    ReactiveFormsModule
  ]
})

export class SettingsComponent {
  private fb = inject(FormBuilder);
  addressForm = this.fb.group({
    notiz: [null, Validators.required],
    state: [null, Validators.required]
  });

  hasUnitNumber = false;

  states = [
    "AUSGEBORGT",
    "RESERVIERT",
    "ZURÜCKGEGEBEN",
    "ÜBERZOGEN",
    "AUSSTEHEND"
  ];

  onSubmit(): void {
    alert('Thanks!');
  }
}
