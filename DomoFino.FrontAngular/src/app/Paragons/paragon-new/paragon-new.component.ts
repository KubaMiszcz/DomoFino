import { Component, OnInit } from "@angular/core";
import { NgbCalendar, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { ICategory } from "src/app/models/category";
import { AppService } from "src/app/services/app.service";
import { CategoryService } from "src/app/services/category.service";
import { ParagonService } from "src/app/services/paragon.service";
import { IParagon, Paragon } from "./../../models/paragon";

@Component({
  selector: "app-paragon-new",
  templateUrl: "./paragon-new.component.html",
  styleUrls: ["./paragon-new.component.css"]
})
export class ParagonNewComponent implements OnInit {
  categories: ICategory[];
  currentParagon: IParagon = new Paragon();
  DatePickerValue: NgbDateStruct;
  alertMessage: string;
  isError = false;
  isParagonAdding: boolean;

  constructor(
    private _appService: AppService,
    private _categoryService: CategoryService,
    private _paragonService: ParagonService,
    private calendar: NgbCalendar
  ) { }

  ngOnInit() {
    console.log("newpara startt");
    this.DatePickerValue = this.calendar.getToday();

    this.categories = this._categoryService.categories;
    this._categoryService.categoriesEmitter.subscribe(
      data => {
        this.categories = data;
        this.InitNewParagon();
      }
    );
    this._categoryService.emitCategories();

    this._paragonService.isParagonAddingEmitter.subscribe(data => this.isParagonAdding = data);

    console.log(this.categories);
  }

  onOK(event) {
    // this.currentParagon.Amount = 111;
    console.log('onokevent', event);
    // if (document.activeElement instanceof HTMLElement) {
    //   // document.activeElement.blur();
    // }
  }

  InitNewParagon() {
    this.currentParagon = new Paragon();
    this.currentParagon.PurchaseDate = this.convertNgbDateStructToDate(
      this.DatePickerValue
    );
    this.currentParagon.Amount = 0;
    this.currentParagon.Category = this.categories[0];
    this.currentParagon.Note = "";
  }

  setCategory(category: ICategory) {
    this.currentParagon.Category = category;
  }

  addNewParagon() {
    this.alertMessage = "";
    this.isError = false;
    if (this.currentParagon.Amount <= 0) {
      console.warn("amount<0", this.currentParagon.Amount);
      this.isError = true;
      this.alertMessage += "kwota mniejsza od zera\n";
    }
    if (this.currentParagon.Category == null) {
      console.warn("category null", this.currentParagon.Category);
      this.isError = true;
      this.alertMessage += "wybierz kategorie\n";
    }

    this.currentParagon.PurchaseDate = this.convertNgbDateStructToDate(
      this.DatePickerValue
    );
    if (this.currentParagon.PurchaseDate > new Date()) {
      console.warn("date beforetoday", this.DatePickerValue);
      this.isError = true;
      this.alertMessage += "Data zakupu z przyszlosci\n";
    }
    if (this.isError) {
      return;
    }

    this._paragonService.SaveNewParagon(this.currentParagon);
    this.InitNewParagon();
  }

  convertNgbDateStructToDate(val: NgbDateStruct): Date {
    let date = new Date();
    date = new Date(date.setFullYear(val.year, val.month - 1, val.day));
    return date;
  }
}
