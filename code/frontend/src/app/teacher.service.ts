import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LocalStorageService} from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private http: HttpClient = inject(HttpClient);

  storageService: LocalStorageService = inject(LocalStorageService);

  private URL: string = 'http://localhost:8080/api/';

  constructor() { }
}
