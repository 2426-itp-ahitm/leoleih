import {Component, inject, Input, OnInit} from '@angular/core';
import {EquipmentService} from '../equipment.service';
import {AsyncPipe, NgForOf, NgIf, SlicePipe} from '@angular/common';
import {RouterLink} from '@angular/router';
import {HttpService} from '../http.service';
import {Equipment} from '../interfaces';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-card-row',
  imports: [
    NgForOf,
    RouterLink,
    SlicePipe,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    NgIf,
    AsyncPipe,
  ],
  templateUrl: './card-row.component.html',
  styleUrl: './card-row.component.css'
})
export class CardRowComponent implements OnInit {
  @Input() rowCount!: number;
  httpService: HttpService = inject(HttpService);
  equipmentService: EquipmentService = inject(EquipmentService);
  equipment: Equipment[] = [];
  filteredEquipment: Equipment[] = [];

  ngOnInit() {
    combineLatest([
      this.httpService.fetchAllVotes(),
      this.equipmentService.searchTerm$,
      this.equipmentService.category$,
      this.equipmentService.selectedTab$
    ]).subscribe(([allEquipment, searchTerm, category, tab]) => {
      this.equipment = allEquipment;
      this.applyFilter(searchTerm, category, tab);
    });
  }

  private applyFilter(searchTerm: string, category: string, tab: string) {
    this.filteredEquipment = this.equipment.filter(item => {
      const name = item.name || '';
      const title = item.title || '';
      const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = category === 'Alle' || item.equipmentType === category;
      return matchesSearch && matchesCategory;
    });

    // Apply tab-specific logic if no search/category filter is active
    if (searchTerm === '' && category === 'Alle') {
      if (tab === 'Am Beliebtesten') {
        // Sort by available count as a proxy for popularity if no other data exists
        this.filteredEquipment.sort((a, b) => b.available - a.available);
      } else if (tab === 'Kürzlich zurückgegeben') {
        // Reverse order as a proxy for recent
        this.filteredEquipment.reverse();
      } else if (tab === 'Aktuell Verfügbar') {
        this.filteredEquipment = this.filteredEquipment.filter(item => item.available > 0);
      } else if (tab === 'Erneut Entlehnen') {
        // Show a subset of items
        this.filteredEquipment = this.filteredEquipment.slice(4, 12);
      }
    }
  }

  resetFilters() {
    this.equipmentService.setSearchTerm('');
    this.equipmentService.setCategory('Alle');
  }
}
