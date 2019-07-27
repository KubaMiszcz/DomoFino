import { Component, OnInit } from '@angular/core';
import { AppServiceService } from './app-service.service';
import { IAppUser, AppUsers } from './models/app-user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'UlaParApp';
  user: IAppUser;

  constructor(
    private appService: AppServiceService
  ) {

  }
  ngOnInit(): void {
    console.log('AppUsersapppppp');
    this.user = AppUsers[0];
  }
}
