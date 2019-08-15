import { AppUserService } from "./../services/app-user.service";
import { AppService } from "./../services/app.service";
import { Router } from "@angular/router";
import { IAppUser, APPUSERS } from "./../models/app-user";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  users: IAppUser[] = APPUSERS;
  isLoginInProgress: boolean;

  constructor(
    private _router: Router,
    private _appService: AppService,
    private _appUserService: AppUserService
  ) { }

  ngOnInit() {
    console.log(this.users);

    let currentUser = this._appUserService.currentUser;
    if (currentUser == null) {
      currentUser = JSON.parse(localStorage.getItem("currentUser"));
    }

    if (currentUser.Id != null) {
      this._router.navigate(["/main-page"]);
    }

    this._appUserService.isLoginInProgress.subscribe(data => this.isLoginInProgress = data);
  }

  login(username: string, password: string) {
    this._appUserService.login(username, password);
  }
}
