import { Component, OnInit } from "@angular/core";
import { NgbCalendar, NgbDateStruct, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ICategory } from "src/app/models/category";
import { AppService } from "src/app/services/app.service";
import { CategoryService } from "src/app/services/category.service";
import { ParagonService } from "src/app/services/paragon.service";
import { IParagon, Paragon } from "./../../models/paragon";
import { typeWithParameters } from "@angular/compiler/src/render3/util";
import { NumPadComponent } from "src/app/num-pad/num-pad.component";

@Component({
  selector: "app-paragon-new",
  templateUrl: "./paragon-new.component.html",
  styleUrls: ["./paragon-new.component.css"]
})
export class ParagonNewComponent implements OnInit {
  categories: ICategory[];
  currentDatePickerValue: NgbDateStruct;
  currentAmount: string = '';
  currentCategory: ICategory;
  currentNote: string;
  alertMessage: string;
  isError = false;
  isParagonAdding: boolean;

  constructor(
    private _appService: AppService,
    private _categoryService: CategoryService,
    private _paragonService: ParagonService,
    private calendar: NgbCalendar,
    private ngbModal: NgbModal
  ) { }

  ngOnInit() {
    console.log("newpara startt");
    this._paragonService.isParagonAddingBS.subscribe(data => this.isParagonAdding = data);

    this._categoryService.categoriesBS.subscribe(
      data => {
        this.categories = data;
        this.InitNewParagon();
      }
    );
  }

  onOK(event) {
    // console.log(this.AmountValue);
    // // console.log(value.toString());
    // // let s = this.currentParagon.Amount.toString();
    // try {
    //   let n = eval(this.AmountValue);
    //   console.log(n);
    //   this.currentParagon.Amount = Math.round(n * 100) / 100;
    // } catch (error) {
    //   console.log(error);
    // }
    // this.currentParagon.Amount.toFixed(2);
    // let b = eval(event);
    // // this.currentParagon.Amount = 111;
    // console.log('onokevent', event);
    // try {
    //   this.currentParagon.Amount = b;
    // } catch (error) {
    //   throw error;
    // }
    // if (document.activeElement instanceof HTMLElement) {
    //   // document.activeElement.blur();
    // }
  }

  InitNewParagon() {
    this.currentDatePickerValue = this.calendar.getToday();
    this.currentAmount='';
    this.currentCategory = this.categories[0];
    this.currentNote = '';
  }

  setCategory(category: ICategory) {
    this.currentCategory = category;
  }

  addNewParagon() {
    this.alertMessage = "";
    this.isError = false;


    if (parseFloat(this.currentAmount) <= 0) {
      console.warn("amount<0", this.currentAmount);
      this.isError = true;
      this.alertMessage += "kwota mniejsza od zera\n";
    }
    if (this.currentCategory == null) {
      console.warn("category null", this.currentCategory);
      this.isError = true;
      this.alertMessage += "wybierz kategorie\n";
    }


    if (this.convertNgbDateStructToDate(this.currentDatePickerValue) > new Date()) {
      console.warn("date beforetoday", this.currentDatePickerValue);
      this.isError = true;
      this.alertMessage += "Data zakupu z przyszlosci\n";
    }

    if (this.isError) {
      return;
    }

    const paragon = new Paragon();
    paragon.PurchaseDate = this.convertNgbDateStructToDate(this.currentDatePickerValue);
    paragon.Amount = parseFloat(this.currentAmount);
    paragon.Category = this.currentCategory;
    paragon.Note = this.currentNote;
    paragon.IsDeletePending = false;

    console.log('paragon to add:', paragon);
    this._paragonService.SaveNewParagon(paragon);
    this.InitNewParagon();
  }

  openNumpad(value) {
    const modalRef = this.ngbModal.open(NumPadComponent, { centered: true });
    modalRef.componentInstance.expression = value;
    modalRef.result.then(data => this.currentAmount = data);
  }

  convertNgbDateStructToDate(val: NgbDateStruct): Date {
    let date = new Date();
    date = new Date(date.setFullYear(val.year, val.month - 1, val.day));
    return date;
  }
}
