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
  isParagonUpdating: BehaviorSubject<boolean> = new BehaviorSubject(false);

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

  RenewParagonList() {
    this.isParagonHistoryLoading.next(true);
    let list: IParagon[];
    this.fetchParagonHistory().subscribe(data => list = data,
      () => { },
      () => {
        this.ExtractDeletePending(list);
        this.isParagonHistoryLoading.next(false);
      }
    );
  }

  ExtractDeletePending(list: IParagon[]) {
    this.paragonHistoryBS.next(list.filter(x => !x.IsDeletePending));
    this.deletedParagonHistoryBS.next(list.filter(x => x.IsDeletePending));
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
        () => this.isParagonAddingBS.next(false),
        () => {
          this.paragonHistoryBS.next([... this.paragonHistoryBS.getValue(), paragon]);
          console.log("SavedParagon: ", paragon);
          this.isParagonAddingBS.next(false);
        });
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

  UpdateParagon(paragon: IParagon) {
    let body = new HttpParams();
    body = body.set("data", JSON.stringify(paragon));
    const requestOptions: Object = {
      headers: new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded"),
      params: body,
      responseType: "json"
    };

    this.isParagonUpdating.next(true);
    const list = [... this.paragonHistoryBS.getValue(), ...this.deletedParagonHistoryBS.getValue()];
    console.log('list', list);
    let newp: IParagon;
    this.http.put<IParagon>(API_URL + "Paragon/Update", body, requestOptions)
      .subscribe(data => newp = data,
        () => this.isParagonUpdating.next(false),
        () => {
          let p = list.find(x => x.Id === newp.Id);
          let idx = list.indexOf(p);
          console.log('list', list);
          list[idx] = newp;
          console.log('list', list);
          this.ExtractDeletePending(list);
          console.log('updated', idx, newp);
          this.isParagonUpdating.next(false);
        }
      );
  }

}
