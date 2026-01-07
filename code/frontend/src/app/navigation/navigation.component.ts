import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { MatBadgeModule } from '@angular/material/badge';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { LocalStorageService } from '../local-storage.service';
import { NgIf } from '@angular/common';
import { logout } from '../../main';
import { UserService } from '../user.service';
import { Person } from '../interfaces';
import { HttpService } from '../http.service';
import { EquipmentService } from '../equipment.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navigation',
  imports: [
    RouterLink,
    MatBadgeModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    NgIf,
    FormsModule,
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
})
export class NavigationComponent implements OnInit {
  route = inject(ActivatedRoute);
  router = inject(Router);
  localStorageService: LocalStorageService = inject(LocalStorageService);
  userService: UserService = inject(UserService);
  httpService: HttpService = inject(HttpService);
  equipmentService: EquipmentService = inject(EquipmentService);
  badgeCount: number = 0;
  user?: Person;

  searchTerm: string = '';
  selectedCategory: string = 'Alle';

  constructor() {
    this.localStorageService.badgeCount.subscribe((count: number) => {
      this.badgeCount = count;
    });

    this.userService.user$.subscribe(person => {
      this.user = person ?? undefined;
      console.log('Navigation updated user:', this.user?.firstname);
    });

    this.equipmentService.searchTerm$.subscribe(term => {
      this.searchTerm = term;
    });

    this.equipmentService.category$.subscribe(cat => {
      this.selectedCategory = cat;
    });
  }

  ngOnInit() {
    this.localStorageService.getStorageItemCount();
  }

  onSearchChange() {
    this.equipmentService.setSearchTerm(this.searchTerm);
    if (this.router.url !== '/' && this.searchTerm !== '') {
      this.router.navigate(['/']);
    }
  }

  onCategoryChange() {
    this.equipmentService.setCategory(this.selectedCategory);
    if (this.router.url !== '/') {
      this.router.navigate(['/']);
    }
  }

  protected readonly logout = logout;
}
