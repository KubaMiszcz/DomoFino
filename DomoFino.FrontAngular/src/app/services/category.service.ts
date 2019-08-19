import { AppUserService } from './app-user.service';
import { Injectable, EventEmitter, Output } from "@angular/core";
import { AppService, API_URL } from "./app.service";
import { ICategory, Category } from "../models/category";
import { Observable, BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { share, map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class CategoryService {
  categoriesBS: BehaviorSubject<Category[]>;

  constructor(
    private _appService: AppService,
    private appUserService: AppUserService,
    private http: HttpClient,
    private _router: Router
  ) {
    const dummyCategory = new Category();
    dummyCategory.Name = "empty";
    this.categoriesBS = new BehaviorSubject([dummyCategory]);
    console.log('this.categoriesBS.getValue()', this.categoriesBS.getValue());

    let categories: ICategory[];
    this.fetchCategories().pipe(share()).subscribe(
      data => (categories = data),
      () => { },
      () => {
        categories.map(x => { if (x.BackgroundColor === null) { x.BackgroundColor = '#ffffff' } })
        this.categoriesBS.next(categories)
        console.log("category service loaded", this.categoriesBS.getValue());
      }
    );
  }

  fetchCategories(): Observable<ICategory[]> {
    let u = this.appUserService.currentUserBS.getValue();
    return this.http.get<ICategory[]>(API_URL + "category/GetAllForUser?username=" + u.Username);
  }
}
