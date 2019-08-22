import { ParagonService } from './paragon.service';
import { CategoryService } from './category.service';
import { Observable, BehaviorSubject } from "rxjs";
import { Injectable, Output, EventEmitter } from "@angular/core";
import { AppService, API_URL } from "./app.service";
import { IAppUser, AppUser } from "../models/app-user";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AppUserService {
  currentUserBS: BehaviorSubject<IAppUser>;
  isLoginInProgress: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private http: HttpClient,
    private _router: Router
  ) {
    console.log("user service start");
    // let user = new AppUser();
    // user.Username = "niezalogowany";
    this.currentUserBS = new BehaviorSubject(null);
  }

  login(username: string, password: string) {
    let body = new HttpParams();
    body = body.set("data", JSON.stringify([username, password]));
    const requestOptions: Object = {
      headers: new HttpHeaders().set(
        "Content-Type",
        "application/x-www-form-urlencoded"
      ),
      params: body,
      responseType: "json"
    };

    let user: IAppUser;
    this.http.post<IAppUser>(API_URL + "User/Login", body, requestOptions)
      .subscribe(data => {
        this.isLoginInProgress.next(true);
        user = data;
      },
        () => { },
        () => {
          setTimeout(() => {
            localStorage.setItem("currentUser", JSON.stringify(user));
            this.currentUserBS.next(user);
            this.isLoginInProgress.next(false);
            console.log(' this.isLoginInProgress.next(false);', false);
            this._router.navigate(["/main-page"]);
          }, 400);
        }
      );
  }

  logout() {
    localStorage.removeItem("currentUser");
    console.log("logged out");
    this._router.navigate(["/login"]);
  }

  // fetchCurrentUser(): Observable<IAppUser> {
  //   return this.http.get<IAppUser>(
  //     API_URL + "user/GetByUsername?username=" + this.currentUser.Username
  //   );
  // }

  // getCurrentUser(): IAppUser {
  //   if (this.currentUser.Id == null) {
  //     this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
  //     if (this.currentUser == null) {
  //       this._router.navigate(["/login"]);
  //     }
  //   }
  //   return this.currentUser;
  // }

  // emitCurrentUser() {
  //   this.currentUserEmitter.emit(this.currentUser);
  // }
}
