import { Injectable } from '@angular/core';
import {KeycloakUserProfile} from './keycloak-user-info';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  isTeacher: boolean = false;

  checkIfTeacher(keycloakUser: KeycloakUserProfile) {
    return !keycloakUser.distinguishedName.includes("Students")
  }

  constructor() { }
}
