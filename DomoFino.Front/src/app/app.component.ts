import { Component, OnInit } from '@angular/core';
import { AppService } from './app-service.service';
import { IAppUser, AppUsers } from './models/app-user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'DomoFino';
  currentUser: IAppUser;

  constructor(
    private appService: AppService
  ) {

  }
  ngOnInit(): void {
    console.log('AppUsersapppppp');
    this.currentUser = AppUsers[0];
  }
}
