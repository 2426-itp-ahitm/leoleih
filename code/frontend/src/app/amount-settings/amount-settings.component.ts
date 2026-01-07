import {Component, inject, Input, OnInit} from '@angular/core';
import {LocalStorageService} from '../local-storage.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-amount-settings',
  imports: [
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './amount-settings.component.html',
  styleUrl: './amount-settings.component.css'
})
export class AmountSettingsComponent implements OnInit {
  localStorageService: LocalStorageService = inject(LocalStorageService);
  @Input() maxAmount: number | undefined;
  @Input() chosenAmount : number | undefined;
  amount: number = 1;

  ngOnInit(): void {
    if (this.chosenAmount != undefined) {
      this.amount = this.chosenAmount;
    }
  }

  getCurrentAmount() {
    return this.amount;
  }
}
