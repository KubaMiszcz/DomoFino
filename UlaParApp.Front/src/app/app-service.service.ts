import { Injectable, Output, EventEmitter, OnInit } from '@angular/core';
import { IAppUser, AppUsers } from './models/app-user';
import { ICategory, Categories } from './models/category';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {
  user: IAppUser;
  categories: ICategory[];

  @Output() currentUserEmitter: EventEmitter<IAppUser> = new EventEmitter<IAppUser>();
  @Output() categoriesEmitter: EventEmitter<ICategory[]> = new EventEmitter<ICategory[]>();

  constructor() {
    console.log('appservice ctro');
    this.user = AppUsers[1];
    this.categories = Categories;

    setTimeout(() => {
      this.categoriesEmitter.emit(this.categories);
    }, 5000);
  }

}



