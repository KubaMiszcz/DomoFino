import { IParagon, Paragon } from "./../../models/paragon";
import { Component, OnInit, Input } from "@angular/core";
import {
  NgbActiveModal,
  NgbCalendar,
  NgbDateStruct
} from "@ng-bootstrap/ng-bootstrap";
import { AppService } from "src/app/services/app.service";
import { CategoryService } from "src/app/services/category.service";
import { ParagonService } from "src/app/services/paragon.service";
import { ICategory } from "src/app/models/category";

@Component({
  selector: "app-edit-paragon-modal",
  templateUrl: "./edit-paragon-modal.component.html",
  styleUrls: ["./edit-paragon-modal.component.css"]
  // encapsulation: ViewEncapsulation.None
})
export class EditParagonModalComponent implements OnInit {
  public paragon: IParagon;
  categories: ICategory[];
  DatePickerValue: NgbDateStruct;
  alertMessage: string;
  isError = false;

  constructor(
    public activeModal: NgbActiveModal,
    private _appService: AppService,
    private _categoryService: CategoryService,
    private _paragonService: ParagonService,
    private calendar: NgbCalendar
  ) {}

  ngOnInit() {
    this.DatePickerValue = this.calendar.getToday();

    this.categories = this._categoryService.categories;
    this._categoryService.categoriesEmitter.subscribe(
      data => (this.categories = data)
    );
  }

  setCategory(category: ICategory) {
    this.paragon.Category = category;
  }

  close(str: string) {
    this.activeModal.close(str);
  }

  emitResult(str: string) {
    this.activeModal.close(str);
  }

  moveToRecycleBin() {
    this.paragon.IsDeletePending = true;
    this._paragonService.UpdateParagon(this.paragon);
    this.close("move to bin");
  }

  editParagon() {
    this.alertMessage = "";
    this.isError = false;
    if (this.paragon.Amount <= 0) {
      console.warn("amount<0", this.paragon.Amount);
      this.isError = true;
      this.alertMessage += "kwota mniejsza od zera\n";
    }
    if (this.paragon.Category == null) {
      console.warn("category null", this.paragon.Category);
      this.isError = true;
      this.alertMessage += "wybierz kategorie\n";
    }

    this.paragon.PurchaseDate = this.convertNgbDateStructToDate(
      this.DatePickerValue
    );
    if (this.paragon.PurchaseDate > new Date()) {
      console.warn("date beforetoday", this.DatePickerValue);
      this.isError = true;
      this.alertMessage += "Data zakupu z przyszlosci\n";
    }
    if (this.isError) {
      return;
    }

    this._paragonService.UpdateParagon(this.paragon);
    this.close("updated");
  }

  convertNgbDateStructToDate(val: NgbDateStruct): Date {
    let date = new Date();
    date = new Date(date.setFullYear(val.year, val.month - 1, val.day));
    return date;
  }
}
