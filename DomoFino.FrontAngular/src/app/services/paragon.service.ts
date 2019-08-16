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
  // paragonHistory: IParagon[] = [];
  // @Output() paragonHistoryEmitter: EventEmitter<IParagon[]> = new EventEmitter<IParagon[]>();
  paragonHistoryBS: BehaviorSubject<IParagon[]>;

  // deletedParagonHistory: IParagon[] = [];
  // @Output() deletedParagonHistoryEmitter: EventEmitter<IParagon[]> = new EventEmitter<IParagon[]>();
  deletedParagonHistoryBS: BehaviorSubject<IParagon[]>;

  isParagonAddingBS: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isParagonHistoryLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private _appUserService: AppUserService,
    private http: HttpClient,
  ) {
    this.paragonHistoryBS = new BehaviorSubject([]);
    this.deletedParagonHistoryBS = new BehaviorSubject([]);
  }

  fetchParagonHistory(): Observable<IParagon[]> {
    return this.http.get<IParagon[]>(API_URL + "Paragon/GetByUserForGroup?" +
      "username=" + this._appUserService.currentUserBS.getValue().Username
    );
  }

  getParagonHistory() {
    this.isParagonHistoryLoading.next(true);
    let paragonHistory2: IParagon[];
    this.fetchParagonHistory().subscribe(data => paragonHistory2 = data,
      () => { },
      () => {
        this.paragonHistoryBS.next(this.filterDeleteParagons(paragonHistory2, false));
        this.deletedParagonHistoryBS.next(this.filterDeleteParagons(paragonHistory2, true));
        this.isParagonHistoryLoading.next(false);
      }
    );
  }

  // getParagonHistoryxxxxxxxxxxxx() {
  //   this.isParagonHistoryLoading.next(true);
  //   this.fetchParagonHistory().subscribe(data => this.paragonHistory = data,
  //     () => { },
  //     () => {
  //       const list = this.paragonHistory;
  //       this.paragonHistory = this.filterDeleteParagons(list, false);
  //       this.deletedParagonHistory = this.filterDeleteParagons(list, true);
  //       this.nextParagonHistory();
  //       this.isParagonHistoryLoading.next(false);
  //     }
  //   );
  // }

  filterDeleteParagons(list: IParagon[], isDeleted: boolean) {
    console.log(list.filter(p => p.IsDeletePending == isDeleted));
    return list.filter(p => p.IsDeletePending == isDeleted);

  }

  // nextParagonHistory() {
  //   this.paragonHistoryBS.next(this.paragonHistory);
  //   this.deletedParagonHistoryBS.next(this.deletedParagonHistory);
  // }

  SwitchMoveToBin(paragon: IParagon) {
    let paragonHistory = this.paragonHistoryBS.getValue();
    let deletedParagonHistory = this.deletedParagonHistoryBS.getValue();
    if (paragon.IsDeletePending) {
      const idx = paragonHistory.indexOf(paragon);
      paragonHistory.splice(idx, 1);
      deletedParagonHistory.push(paragon);
    }
    else {
      const idx = deletedParagonHistory.indexOf(paragon);
      deletedParagonHistory.splice(idx, 1);
      paragonHistory.push(paragon);
    }
    this.paragonHistoryBS.next(paragonHistory);
    this.deletedParagonHistoryBS.next(deletedParagonHistory);
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

    this.isParagonAddingBS.next(true);
    this.http.post<IParagon>(API_URL + "Paragon/AddNew", body, requestOptions)
      .subscribe(data => paragon = data,
        () => { },
        () => {
          this.paragonHistoryBS.next([... this.paragonHistoryBS.getValue(), paragon]);
          console.log("SavedNewParagon [... this.paragonHistoryBS.getValue(), paragon]", [... this.paragonHistoryBS.getValue(), paragon]);
          this.isParagonAddingBS.next(false);
          console.log("SavedParagon: ", paragon);
          console.log("complete");
        }
      );
  }

  EmptyRecycleBinPermanently() {
    let list: number[] = [];
    this.deletedParagonHistoryBS.getValue().forEach(element => { list.push(element.Id); });
    console.log('EmptyRecycleBinPermanently list', list);

    let body = new HttpParams();
    body = body.set("data", JSON.stringify(list));
    const requestOptions: Object = {
      headers: new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded"),
      params: body,
      responseType: "json"
    };

    this.http.delete<IParagon>(API_URL + "Paragon/DeleteFromBin", requestOptions)
      .subscribe(data => {
        console.log("deleted: " + data);
        this.deletedParagonHistoryBS.next([]);
      });
  }

  // DeleteParagon(paragon: IParagon) {
  //   this.http
  //     .delete<IParagon>(API_URL + "Paragon/Delete/" + paragon.Id)
  //     .subscribe(data => {
  //       console.log("deleted: " + data);
  //       const index = this.paragonHistory.indexOf(paragon);
  //       // todo: this.paragonHistory.splice(index, 1);
  //     });

  //   // if (paragon.IsDeletePending) {
  //   //   const idx = this.paragonHistory.indexOf(paragon);
  //   //   this.paragonHistory.splice(idx, 1);
  //   // }
  // }

  UpdateParagon(paragon: IParagon) {
    paragon.AddedById = this._appUserService.currentUserBS.getValue().Id;
    let body = new HttpParams();
    body = body.set("data", JSON.stringify(paragon));
    const requestOptions: Object = {
      headers: new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded"),
      params: body,
      responseType: "json"
    };

    this.http.put<IParagon>(API_URL + "Paragon/Update", body, requestOptions)
      .subscribe(data => {
        console.log("UpdatedParagon: " + data);
        //todo: this.paragonHistory.push(paragon);
      });
  }
}
