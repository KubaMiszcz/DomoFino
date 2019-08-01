import { AppUserService } from './../services/app-user.service';
import { ICategory } from 'src/app/models/category';
import { Component, OnInit } from '@angular/core';
import { IAppUser, AppUser } from '../models/app-user';
import { Router } from '@angular/router';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  currentUser: IAppUser;

  constructor(
    private _appService: AppService,
    private _appUserService: AppUserService,
    private _router: Router,
  ) {
    this.currentUser = new AppUser();
    this.currentUser.Fullname = 'niezalogowany';
  }

  ngOnInit() {
    this.currentUser = this._appUserService.getCurrentUser();
    this._appUserService.fetchCurrentUser().subscribe(data => this.currentUser = data);
  }

  logout() {
    this._appUserService.logout();
  }

}
