import { Observable } from 'rxjs';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { AppService, API_URL } from './app.service';
import { IAppUser, AppUser } from '../models/app-user';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AppUserService {
  currentUser: IAppUser;
  @Output() currentUserEmitter: EventEmitter<IAppUser> = new EventEmitter<IAppUser>();

  constructor(private _appService: AppService,
    private http: HttpClient,
    private _router: Router) {
    this.currentUser = new AppUser();
    console.log('user service start');
    this.currentUser.Username = 'niezalogowany';
    console.log(this.currentUser);
  }

  login(username: string) {
    this.currentUser.Username = username;
    console.log(this.currentUser);

    this.fetchCurrentUser().subscribe(data => {
      this.currentUser = data;
    },
      () => { },
      () => {
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        this.currentUserEmitter.emit(this.currentUser);
        this._router.navigate(['/main-page']);
      }
    );
  }


  logout() {
    localStorage.removeItem('currentUser');
    this.currentUser = new AppUser();
    this.currentUser.Username = 'niezalogowany';
    console.log('logged out');
    this._router.navigate(['/login']);
  }


  fetchCurrentUser(): Observable<IAppUser> {
    return this.http.get<IAppUser>(API_URL + 'user/GetByUsername?username=' + this.currentUser.Username);
  }


  getCurrentUser(): IAppUser {
    if (this.currentUser.Id == null) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (this.currentUser == null) {
        this._router.navigate(['/login']);
      }
    }
    return this.currentUser;
  }

  emitCurrentUser() {
    this.currentUserEmitter.emit(this.currentUser);
  }
}
