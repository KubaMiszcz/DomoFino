import { IParagon, Paragon } from "./../../models/paragon";
import { Component, OnInit, Input, ViewEncapsulation } from "@angular/core";
import { NgbActiveModal, NgbCalendar, NgbDateStruct, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AppService } from "src/app/services/app.service";
import { CategoryService } from "src/app/services/category.service";
import { ParagonService } from "src/app/services/paragon.service";
import { ICategory } from "src/app/models/category";
import { NumPadComponent } from "src/app/num-pad/num-pad.component";

@Component({
  selector: "app-edit-paragon-modal",
  templateUrl: "./edit-paragon-modal.component.html",
  styleUrls: ["./edit-paragon-modal.component.css"],
  // encapsulation: ViewEncapsulation.None
})
export class EditParagonModalComponent implements OnInit {
  public currentParagon: IParagon;
  categories: ICategory[];
  currentDatePickerValue: NgbDateStruct;
  currentAmount: number = 0;
  currentCategory: ICategory;
  currentNote: string;
  currentIsDeletePending: boolean;
  alertMessage: string;
  isError = false;
  isParagonUpdating: boolean;

  constructor(
    public activeModal: NgbActiveModal,
    public ngbModal: NgbModal,
    private _appService: AppService,
    private _categoryService: CategoryService,
    private _paragonService: ParagonService,
    private calendar: NgbCalendar
  ) { }

  ngOnInit() {
    console.log('ediparamodal', this.currentParagon);

    this._paragonService.isParagonUpdating.subscribe(data => this.isParagonUpdating = data);
    this.currentDatePickerValue = this.calendar.getToday();
    this._categoryService.categoriesBS.subscribe(data => this.categories = data);
    this.InitForm(this.currentParagon);
  }

  InitForm(paragon: IParagon) {
    this.currentDatePickerValue = this.calendar.getToday();
    // this.currentDatePickerValue.year = paragon.PurchaseDate.getFullYear();
    // this.currentDatePickerValue.month = paragon.PurchaseDate.getMonth();
    // this.currentDatePickerValue.day = paragon.PurchaseDate.getDay();
    this.currentAmount = paragon.Amount;
    this.currentCategory = paragon.Category;
    this.currentNote = paragon.Note;
    this.currentIsDeletePending = paragon.IsDeletePending;
  }

  setCategory(category: ICategory) {
    this.currentCategory = category;
  }

  close(str: string) {
    this.activeModal.close('cancel edit');
  }

  acceptEdit() {
    this.alertMessage = "";
    this.isError = false;

    if (this.currentAmount <= 0) {
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
    paragon.Id = this.currentParagon.Id;
    paragon.AddedById = this.currentParagon.AddedById;
    paragon.PurchaseDate = this.convertNgbDateStructToDate(this.currentDatePickerValue);
    paragon.Amount = this.currentAmount;
    paragon.Category = this.currentCategory;
    paragon.Note = this.currentNote;
    paragon.IsDeletePending = this.currentIsDeletePending;

    console.log('paragon updated', paragon);
    this.activeModal.close(paragon);
  }

  switchMoveToRecycleBin() {
    this.currentIsDeletePending = !this.currentIsDeletePending;
    this.acceptEdit();
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
