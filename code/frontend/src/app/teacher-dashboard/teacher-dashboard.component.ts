import {Component, inject, OnInit} from '@angular/core';
import {TeacherService} from '../teacher.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-teacher-dashboard',
  imports: [],
  templateUrl: './teacher-dashboard.component.html',
  styleUrl: './teacher-dashboard.component.css'
})
export class TeacherDashboardComponent implements OnInit{
    teacherService: TeacherService = inject(TeacherService);
    router: Router = inject(Router);

    ngOnInit() {
      if(!this.teacherService.isTeacher){
        this.router.navigate(['/students']);
      }
    }
}
