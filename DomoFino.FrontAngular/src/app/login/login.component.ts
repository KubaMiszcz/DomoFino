import { AppUserService } from "./../services/app-user.service";
import { AppService } from "./../services/app.service";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  isLoginInProgress: boolean;

  constructor(
    private _router: Router,
    private _appService: AppService,
    private _appUserService: AppUserService
  ) { }

  ngOnInit() {
    this._appUserService.isLoginInProgress.subscribe(data => this.isLoginInProgress = data);
  }

  login(username: string, password: string) {
    this._appUserService.login(username, password);
  }
}
