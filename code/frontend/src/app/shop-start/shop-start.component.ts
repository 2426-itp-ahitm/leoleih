import { Component, inject } from '@angular/core';
import {CardRowComponent} from '../card-row/card-row.component';
import { MatTabsModule, MatTabChangeEvent } from '@angular/material/tabs';
import { EquipmentService } from '../equipment.service';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-shop-start',
  imports: [
    CardRowComponent,
    MatTabsModule,
    NgIf,
    AsyncPipe,
  ],
  templateUrl: './shop-start.component.html',
  styleUrl: './shop-start.component.css'
})
export class ShopStartComponent {
  equipmentService = inject(EquipmentService);

  onTabChange(event: MatTabChangeEvent) {
    this.equipmentService.setSelectedTab(event.tab.textLabel);
  }
}
