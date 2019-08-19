import { AppUserService } from "./../services/app-user.service";
import { AppService } from "./../services/app.service";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { NumPadComponent } from "../num-pad/num-pad.component";

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
    private _appUserService: AppUserService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this._appUserService.isLoginInProgress.subscribe(data => this.isLoginInProgress = data);


    const modalRef = this.modalService.open(NumPadComponent, { centered: true });
    // modalRef.componentInstance.paragon = item;
  }

  login(username: string, password: string) {
    this._appUserService.login(username, password);
  }
}
