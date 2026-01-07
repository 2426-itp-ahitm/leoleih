import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {
  private searchTermSubject = new BehaviorSubject<string>('');
  searchTerm$ = this.searchTermSubject.asObservable();

  private categorySubject = new BehaviorSubject<string>('Alle');
  category$ = this.categorySubject.asObservable();

  private selectedTabSubject = new BehaviorSubject<string>('Am Beliebtesten');
  selectedTab$ = this.selectedTabSubject.asObservable();

  constructor() { }

  setSearchTerm(term: string) {
    this.searchTermSubject.next(term);
  }

  setCategory(category: string) {
    this.categorySubject.next(category);
  }

  setSelectedTab(tab: string) {
    this.selectedTabSubject.next(tab);
  }
}
