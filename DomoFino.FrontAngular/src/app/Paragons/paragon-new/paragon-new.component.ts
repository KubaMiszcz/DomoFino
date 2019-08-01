import { Categoryervice } from 'src/app/services/category.service';
import { map } from 'rxjs/operators';
import { IParagon, Paragon } from './../../models/paragon';
import { Component, OnInit } from '@angular/core';
import { ICategory, Category } from 'src/app/models/category';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from 'src/app/services/app.service';
import { ParagonService } from 'src/app/services/paragon.service';

@Component({
  selector: 'app-paragon-new',
  templateUrl: './paragon-new.component.html',
  styleUrls: ['./paragon-new.component.css']
})
export class ParagonNewComponent implements OnInit {
  categories: ICategory[];
  currentParagon: IParagon = new Paragon();
  DatePickerValue: NgbDateStruct;
  alertMessage: string = 'egegegeh';
  isError = false;

  constructor(private _appService: AppService,
    private _categoryService: Categoryervice,
    private _paragonService: ParagonService,
    private calendar: NgbCalendar) { }



  ngOnInit() {
    this.DatePickerValue = this.calendar.getToday();
    console.log(this.DatePickerValue);
    this.InitNewParagon();


    this.categories = this._categoryService.categories;
    this._categoryService.categoriesEmitter.subscribe(data =>
      this.categories = data
    );




    // this._paragonService.fetchParagonHistory();
    // this._paragonService.paragonHistoryEmitter.subscribe(data => this.paragonHistory = data);


    // this.currentParagonPurchaseDate = this.calendar.getToday();
    // this.currentParagonCategory = this.categories[0].Name;
    // this.currentParagonAmount = 0;
    // this.currentParagonNote = '';
  }

  InitNewParagon() {
    this.currentParagon = new Paragon();
    this.currentParagon.PurchaseDate = this.convertNgbDateStructToDate(this.DatePickerValue);
    this.currentParagon.Amount = 0;
    this.currentParagon.Note = '';
  }

  setCategory(category: ICategory) {
    this.currentParagon.Category = category;
    console.log(category.Name);
  }


  addNewParagon() {
    this.alertMessage = '';
    if (this.currentParagon.Amount <= 0) {
      console.warn('amount<0', this.currentParagon.Amount);
      this.isError = true;
      this.alertMessage += 'kwota mniejsza od zera\n';
      return;
    }
    if (this.currentParagon.Category == null) {
      console.warn('category null', this.currentParagon.Category);
      this.isError = true;
      this.alertMessage += 'wybierz kategorie\n';
      return;
    }
    this.currentParagon.PurchaseDate = this.convertNgbDateStructToDate(this.DatePickerValue);
    if (this.DatePickerValue > this.calendar.getToday()) {
      console.warn('date beforetoday', this.currentParagon.Category);
      this.isError = true;
      this.alertMessage += 'Data zakupu z przyszlosci\n';
      return;
    }

    this.isError = false;
    this._paragonService.SaveNewParagon(this.currentParagon);
    this.InitNewParagon();
    console.log(this.currentParagon);
  }

  convertNgbDateStructToDate(val: NgbDateStruct): Date {
    let date = new Date();
    date = new Date(date.setFullYear(val.year, val.month - 1, val.day));
    console.log(date);
    return date;
  }
}
