import { Observable } from "rxjs";
import { Injectable, Output, EventEmitter } from "@angular/core";
import { AppService, API_URL } from "./app.service";
import { IAppUser, AppUser } from "../models/app-user";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AppUserService {
  currentUser: IAppUser;
  @Output() currentUserEmitter: EventEmitter<IAppUser> = new EventEmitter<IAppUser>();
  @Output() isLoginInProgressEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private _appService: AppService,
    private http: HttpClient,
    private _router: Router
  ) {
    this.currentUser = new AppUser();
    console.log("user service start");
    this.currentUser.Username = "niezalogowany";
    console.log(this.currentUser);
  }

  login(username: string, password: string) {
    this.currentUser.Username = username;
    console.log(this.currentUser);

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

    this.http
      .post<IAppUser>(API_URL + "User/Login", body, requestOptions)
      .subscribe(data => {
        this.isLoginInProgressEmitter.emit(true);
        console.log(' this.isLoginInProgressEmitter.emit(true);', true);
        this.currentUser = data;
      },
        () => { },
        () => {
          localStorage.setItem("currentUser", JSON.stringify(this.currentUser));
          this.currentUserEmitter.emit(this.currentUser);
          this.isLoginInProgressEmitter.emit(false);
          console.log(' this.isLoginInProgressEmitter.emit(false);', false);
          this._router.navigate(["/main-page"]);
        }
      );
  }

  // login2(username: string) {
  //   this.currentUser.Username = username;
  //   console.log(this.currentUser);

  //   this.fetchCurrentUser().subscribe(
  //     data => {
  //       this.currentUser = data;
  //     },
  //     () => {},
  //     () => {
  //       localStorage.setItem("currentUser", JSON.stringify(this.currentUser));
  //       this.currentUserEmitter.emit(this.currentUser);
  //       this._router.navigate(["/main-page"]);
  //     }
  //   );
  // }

  logout() {
    localStorage.removeItem("currentUser");
    this.currentUser = new AppUser();
    this.currentUser.Username = "niezalogowany";
    console.log("logged out");
    this._router.navigate(["/login"]);
  }

  // fetchCurrentUser(): Observable<IAppUser> {
  //   return this.http.get<IAppUser>(
  //     API_URL + "user/GetByUsername?username=" + this.currentUser.Username
  //   );
  // }

  getCurrentUser(): IAppUser {
    if (this.currentUser.Id == null) {
      this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
      if (this.currentUser == null) {
        this._router.navigate(["/login"]);
      }
    }
    return this.currentUser;
  }

  emitCurrentUser() {
    this.currentUserEmitter.emit(this.currentUser);
  }
}
