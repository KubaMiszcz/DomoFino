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
  paragonHistoryBS: BehaviorSubject<IParagon[]>;
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
    return this.http.get<IParagon[]>(API_URL + "Paragon/GetByUsernameForGroup?" + "username=" + this._appUserService.currentUserBS.getValue().Username
    );
  }

  getParagonHistory() {
    this.isParagonHistoryLoading.next(true);
    let list: IParagon[];
    this.fetchParagonHistory().subscribe(data => list = data,
      () => { },
      () => {
        this.paragonHistoryBS.next(list.filter(x => !x.IsDeletePending));
        this.deletedParagonHistoryBS.next(list.filter(x => x.IsDeletePending));
        this.isParagonHistoryLoading.next(false);
      }
    );
  }

  SwitchMoveToBin(paragon: IParagon) {
    let list: IParagon[];
    if (paragon.IsDeletePending) {
      this.deletedParagonHistoryBS.getValue().push(paragon);
      this.deletedParagonHistoryBS.next(this.deletedParagonHistoryBS.getValue());
      this.paragonHistoryBS.next(this.paragonHistoryBS.getValue().filter(x => !x.IsDeletePending));
    } else {
      this.paragonHistoryBS.getValue().push(paragon);
      this.paragonHistoryBS.next(this.paragonHistoryBS.getValue());
      this.deletedParagonHistoryBS.next(this.deletedParagonHistoryBS.getValue().filter(x => x.IsDeletePending));
    }
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
