import {Component, ElementRef, inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CardRowComponent} from '../card-row/card-row.component';
import {ActivatedRoute, NavigationEnd, Router, RouterLink} from '@angular/router';
import {EquipmentService} from '../equipment.service';
import {NgIf} from '@angular/common';
import {LocalStorageService} from '../local-storage.service';
import {FormsModule, ReactiveFormsModule, FormControl, FormGroup} from '@angular/forms';
import {HttpService} from '../http.service';
import {Subscription} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AmountSettingsComponent} from '../amount-settings/amount-settings.component';
import {Equipment, RentalEquipment} from '../interfaces';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-shop-detail',
  providers: [provideNativeDateAdapter()],
  imports: [
    CardRowComponent,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    AmountSettingsComponent,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule,
    RouterLink,
  ],
  templateUrl: './shop-detail.component.html',
  styleUrl: './shop-detail.component.css'
})
export class ShopDetailComponent implements OnInit {
  equipment: Equipment | undefined;
  httpService: HttpService = inject(HttpService)
  route = inject(ActivatedRoute)
  router = inject(Router)
  currentRentalService: LocalStorageService = inject(LocalStorageService)
  counter = -1
  @ViewChild(AmountSettingsComponent) amountSettingsComponent!: AmountSettingsComponent;
  private snackBar = inject(MatSnackBar);

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  ngOnInit() {
    this.httpService.getEquipmentById(this.route.snapshot.params['id']).subscribe(t => {
      this.equipment = t;
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.httpService.getEquipmentById(this.route.snapshot.params['id']).subscribe(t => {
          this.equipment = t;
        })
      }
    })
  }

  addToCart() {
    if (this.equipment && this.range.value.start && this.range.value.end) {
      this.currentRentalService.addEquipment(this.createRentalEquipment(this.equipment))
      this.snackBar.open('Hinzugefügt', 'Schließen')
      setTimeout(() => {
        this.snackBar.dismiss()
      }, 2500)
    }
  }

  createRentalEquipment(equipment: Equipment): RentalEquipment {
    return {
      id: (this.counter += 1),
      equipmentID: equipment.id,
      count: this.amountSettingsComponent.getCurrentAmount(),
      startTime: this.range.value.start!.toISOString(),
      endTime: this.range.value.end!.toISOString(),
    };
  }

  check() {
    return this.equipment?.available !== 0 &&
           this.equipment !== undefined &&
           this.range.value.start !== null &&
           this.range.value.end !== null &&
           this.amountSettingsComponent?.getCurrentAmount() > 0;
  }
}
