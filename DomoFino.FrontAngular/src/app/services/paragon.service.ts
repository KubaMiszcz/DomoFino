import { compare } from "../Paragons/paragon-list2222/paragon-list.component";
import { Paragon } from "./../models/paragon";
import { Injectable, Output, EventEmitter } from "@angular/core";
import { AppService, API_URL } from "./app.service";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { IParagon } from "../models/paragon";
import { AppUserService } from "./app-user.service";
import { JsonPipe } from "@angular/common";

@Injectable({
  providedIn: "root"
})
export class ParagonService {
  paragonHistory: IParagon[] = [];
  @Output() paragonHistoryEmitter: EventEmitter<IParagon[]> = new EventEmitter<
    IParagon[]
  >();

  constructor(
    private _appService: AppService,
    private _appUserService: AppUserService,
    private http: HttpClient,
    private _router: Router
  ) {}

  // getRecentParagons() {
  //   this.fetchParagonHistory().subscribe(data => this.paragonHistory = data, () => { },
  //     () => {
  //       this.emitParagonHistory();
  //       console.log('getRecentParagons loaded', this.paragonHistory);
  //     });
  // }

  fetchParagonHistory(): Observable<IParagon[]> {
    return this.http.get<IParagon[]>(
      API_URL +
        "Paragon/GetByUsername?" +
        "username=" +
        this._appUserService.currentUser.Username
    );
  }

  getParagonHistory() {
    this.fetchParagonHistory().subscribe(
      data => (this.paragonHistory = data),
      () => {},
      () => this.emitParagonHistory()
    );
  }

  emitParagonHistory() {
    this.paragonHistoryEmitter.emit(this.paragonHistory);
  }

  SaveNewParagon(paragon: IParagon) {
    paragon.AddedById = this._appUserService.currentUser.Id;
    let body = new HttpParams();
    body = body.set("data", JSON.stringify(paragon));
    const requestOptions: Object = {
      headers: new HttpHeaders().set(
        "Content-Type",
        "application/x-www-form-urlencoded"
      ),
      params: body,
      responseType: "json"
    };

    this.http
      .post<IParagon>(API_URL + "Paragon/AddNew", body, requestOptions)
      .subscribe(data => {
        console.log("survey: " + data);
        console.log("complete");
        this.paragonHistory.push(paragon);
      });
  }

  DeleteParagon(paragon: IParagon) {
    this.http
      .delete<IParagon>(API_URL + "Paragon/Delete/" + paragon.Id)
      .subscribe(data => {
        console.log("dleted: " + data);
        const index = this.paragonHistory.indexOf(paragon);
        // todo: this.paragonHistory.splice(index, 1);
      });
  }

  UpdateParagon(paragon: IParagon) {
    paragon.AddedById = this._appUserService.currentUser.Id;
    let body = new HttpParams();
    body = body.set("data", JSON.stringify(paragon));
    const requestOptions: Object = {
      headers: new HttpHeaders().set(
        "Content-Type",
        "application/x-www-form-urlencoded"
      ),
      params: body,
      responseType: "json"
    };

    this.http
      .put<IParagon>(API_URL + "Paragon/Update", body, requestOptions)
      .subscribe(data => {
        console.log("survey: " + data);
        console.log("complete");
        //todo: this.paragonHistory.push(paragon);
      });

    if (paragon.IsDeletePending) {
      const idx = this.paragonHistory.indexOf(paragon);
      this.paragonHistory.splice(idx, 1);
    }
  }
}
