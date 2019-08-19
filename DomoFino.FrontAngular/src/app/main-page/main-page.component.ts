import { IParagon } from './../models/paragon';
import { AppUserService } from './../services/app-user.service';
import { ICategory } from 'src/app/models/category';
import { Component, OnInit } from '@angular/core';
import { IAppUser, AppUser } from '../models/app-user';
import { Router } from '@angular/router';
import { AppService } from '../services/app.service';
import { ParagonService } from '../services/paragon.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  currentUser: IAppUser;
  recentParagonsList: IParagon[];
  isParagonHistoryLoading: boolean = false;



  constructor(
    private _appService: AppService,
    private _appUserService: AppUserService,
    private _router: Router,
    private _ParagonService: ParagonService
  ) {
    this.currentUser = new AppUser();
    this.currentUser.Fullname = 'niezalogowany';
  }

  ngOnInit() {
    this.currentUser = this._appUserService.getCurrentUser();
    // this._appUserService.fetchCurrentUser().subscribe(data => this.currentUser = data);

    this.recentParagonsList = this._ParagonService.paragonHistory;
    this._ParagonService.paragonHistoryEmitter.subscribe(data => this.recentParagonsList = data);
    this._ParagonService.getParagonHistory();
    this._ParagonService.isParagonHistoryLoadingEmitter.subscribe(data => this.isParagonHistoryLoading = data);

    console.log(this.recentParagonsList);
  }

  logout() {
    this._appUserService.logout();
  }

}
