import { Injectable, EventEmitter, Output } from "@angular/core";
import { AppService, API_URL } from "./app.service";
import { ICategory, Category } from "../models/category";
import { Observable, BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { share } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class CategoryService {
  categoriesBS: BehaviorSubject<Category[]>;

  constructor(
    private _appService: AppService,
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
        this.fixNullColors(categories);
        this.categoriesBS.next(categories)
        console.log("category service loaded", this.categoriesBS.getValue());
      }
    );
  }

  fetchCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(API_URL + "category/GetAll");
  }
  fixNullColors(lst: ICategory[]): ICategory[] {
    lst.forEach(element => {
      if (element.BackgroundColor === null) {
        element.BackgroundColor = "#ffffff";
      }
    });
    return lst;
  }
}
