import { Paragon } from "./../models/paragon";
import { Injectable, Output, EventEmitter } from "@angular/core";
import { AppService, API_URL } from "./app.service";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable, BehaviorSubject } from "rxjs";
import { IParagon } from "../models/paragon";
import { AppUserService } from "./app-user.service";
import { JsonPipe } from "@angular/common";
import { share } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ParagonService {
  paragonHistory: IParagon[] = [];
  deletedParagonHistory: IParagon[] = [];
  @Output() paragonHistoryEmitter: EventEmitter<IParagon[]> = new EventEmitter<IParagon[]>();
  @Output() deletedParagonHistoryEmitter: EventEmitter<IParagon[]> = new EventEmitter<IParagon[]>();
  @Output() isParagonAddingEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  isParagonHistoryLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private _appService: AppService,
    private _appUserService: AppUserService,
    private http: HttpClient,
    private _router: Router
  ) { }

  // getRecentParagons() {
  //   this.fetchParagonHistory().subscribe(data => this.paragonHistory = data, () => { },
  //     () => {
  //       this.emitParagonHistory();
  //       console.log('getRecentParagons loaded', this.paragonHistory);
  //     });
  // }

  fetchParagonHistory(): Observable<IParagon[]> {
    return this.http.get<IParagon[]>(API_URL + "Paragon/GetByUserForGroup?" +
      "username=" + this._appUserService.currentUserBS.getValue().Username
    );
  }

  getParagonHistory() {
    this.fetchParagonHistory().subscribe(data => {
      this.isParagonHistoryLoading.next(true);
      this.paragonHistory = data;
    },
      () => { },
      () => {
        const list = this.paragonHistory;
        this.paragonHistory = this.filterDeleteParagons(list, false);
        this.deletedParagonHistory = this.filterDeleteParagons(list, true);
        this.emitParagonHistory();
        this.isParagonHistoryLoading.next(false);
      }
    );
  }

  filterDeleteParagons(list: IParagon[], isDeleted: boolean) {
    console.log(list.filter(p => p.IsDeletePending == isDeleted));
    return list.filter(p => p.IsDeletePending == isDeleted);

  }

  emitParagonHistory() {
    this.paragonHistoryEmitter.emit(this.paragonHistory);
    this.deletedParagonHistoryEmitter.emit(this.deletedParagonHistory);
  }

  SwitchMoveToBin(paragon: IParagon) {
    if (paragon.IsDeletePending) {
      // this.paragonHistory.find(p => p.Id === paragon.Id);
      const idx = this.paragonHistory.indexOf(paragon);
      this.paragonHistory.splice(idx, 1);
      this.deletedParagonHistory.push(paragon);
    }
    else {
      const idx = this.deletedParagonHistory.indexOf(paragon);
      this.deletedParagonHistory.splice(idx, 1);
      this.paragonHistory.push(paragon);
    }
    this.emitParagonHistory();
  }

  SaveNewParagon(paragon: IParagon) {
    paragon.AddedById = this._appUserService.currentUserBS.getValue().Id;
    let body = new HttpParams();
    body = body.set("data", JSON.stringify(paragon));
    const requestOptions: Object = {
      headers: new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded"),
      params: body,
      responseType: "json"
    };

    this.http
      .post<IParagon>(API_URL + "Paragon/AddNew", body, requestOptions)
      .subscribe(data => {
        this.isParagonAddingEmitter.emit(true);
        paragon = data
      },
        () => { },
        () => {
          this.paragonHistory.push(paragon);
          this.isParagonAddingEmitter.emit(false);
          console.log("survey3: ", paragon);
          console.log("complete");
        }
      );
  }

  EmptyRecycleBinPermanently() {
    const list: number[] = [];
    this.deletedParagonHistory.forEach(element => { list.push(element.Id); });

    let body = new HttpParams();
    body = body.set("data", JSON.stringify(list));
    const requestOptions: Object = {
      headers: new HttpHeaders().set(
        "Content-Type",
        "application/x-www-form-urlencoded"
      ),
      params: body,
      responseType: "json"
    };

    this.http.delete<IParagon>(API_URL + "Paragon/DeleteFromBin", requestOptions)
      .subscribe(data => {
        console.log("deleted: " + data);
        this.deletedParagonHistory = [];
        this.emitParagonHistory();
      });
  }

  DeleteParagon(paragon: IParagon) {
    this.http
      .delete<IParagon>(API_URL + "Paragon/Delete/" + paragon.Id)
      .subscribe(data => {
        console.log("deleted: " + data);
        const index = this.paragonHistory.indexOf(paragon);
        // todo: this.paragonHistory.splice(index, 1);
      });

    // if (paragon.IsDeletePending) {
    //   const idx = this.paragonHistory.indexOf(paragon);
    //   this.paragonHistory.splice(idx, 1);
    // }
  }

  UpdateParagon(paragon: IParagon) {
    paragon.AddedById = this._appUserService.currentUserBS.getValue().Id;
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
  }
}
