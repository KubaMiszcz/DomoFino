import { IParagon } from './../models/paragon';
import { AppUserService } from './../services/app-user.service';
import { ICategory } from 'src/app/models/category';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { IAppUser, AppUser } from '../models/app-user';
import { Router } from '@angular/router';
import { AppService } from '../services/app.service';
import { ParagonService } from '../services/paragon.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MainPageComponent implements OnInit {
  currentUser: IAppUser;
  recentParagonsList: IParagon[];
  isParagonHistoryLoading: boolean = false;

  constructor(
    private _appUserService: AppUserService,
    private _ParagonService: ParagonService
  ) { }

  ngOnInit() {
    this._ParagonService.getParagonHistory();
    this._appUserService.currentUserBS.subscribe(data => this.currentUser = data);
    this._ParagonService.isParagonHistoryLoading.subscribe(data => this.isParagonHistoryLoading = data);
    this._ParagonService.paragonHistoryBS.subscribe(data => this.recentParagonsList = this.sortByDateDesc(data));

    console.log(this.recentParagonsList);
  }

  logout() {
    this._appUserService.logout();
  }

  sortByDateDesc(list: IParagon[]): IParagon[] {
    return list.sort((val1, val2) => {
      return (
        <any>new Date(val2.PurchaseDate) - <any>new Date(val1.PurchaseDate)
      );
    });
  }
}
