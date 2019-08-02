import { Component, OnInit, Directive, Input, Output, EventEmitter, QueryList, ViewChildren } from '@angular/core';
import { IParagon, Paragon, PARAGON_HISTORY } from 'src/app/models/paragon';
import { ICategory } from 'src/app/models/category';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from 'src/app/services/app.service';
import { CategoryService } from 'src/app/services/category.service';


export type SortDirection = 'asc' | 'desc' | '';
const rotate: { [key: string]: SortDirection } = { 'asc': 'desc', 'desc': '', '': 'asc' };
export const compare = (v1, v2) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

export interface SortEvent {
  column: string;
  direction: SortDirection;
}

@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class NgbdSortableHeader {

  @Input() sortable: string;
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({ column: this.sortable, direction: this.direction });
  }
}

@Component({
  selector: 'app-paragon-list',
  templateUrl: './paragon-list.component.html',
  styleUrls: ['./paragon-list.component.css']
})
export class ParagonListComponent implements OnInit {
  paragonsList: IParagon[];
  categories: ICategory[];

  currentParagonPurchaseDate: NgbDateStruct;
  currentParagonCategory: string;
  currentParagonAmount: number;
  currentParagonNote: string;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(
    private _appService: AppService,
    private _categoryService: CategoryService,
    private calendar: NgbCalendar) {
  }

  ngOnInit() {
    // this.categories = this._categoryService.categories;
    // this.paragonsList = this._appService.readFromLocalStorage();
    // this.currentParagonPurchaseDate = this.calendar.getToday();
    // this.currentParagonCategory = this.categories[0].Name;
    // this.currentParagonAmount = 0;
    // this.currentParagonNote = '';
  }

  setCategory(category: string) {
    // this.currentParagonCategory = category;
  }

  addParagon(): void {
    // const paragonToAdd = new Paragon();

    // paragonToAdd.Id = 0;
    // paragonToAdd.PurchaseDate = new Date
    //   (
    //     this.currentParagonPurchaseDate.year,
    //     this.currentParagonPurchaseDate.month,
    //     this.currentParagonPurchaseDate.day
    //   );

    // paragonToAdd.Category = this.currentParagonCategory;
    // paragonToAdd.Amount = this.currentParagonAmount;
    // paragonToAdd.Note = this.currentParagonNote;

    // this.paragonsList.push(paragonToAdd);
    // // this._appService.saveToLocalStorage(this.paragonsList);
    // console.log(this.paragonsList);

    // // this.paragonsList = this.paragonsList.sort(function (a, b) => {
    // //   a.PurchaseDate > b.PurchaseDate ? 1 : a.PurchaseDate < b.PurchaseDate ? -1 : 0;
    // // });

    // this.currentParagonAmount = 0.00;
    // this.currentParagonNote = '';
  }

  WriteParagonsListToFile() {
    // console.log('WriteParagonsListToFile', this.paragonsList);
    // this._appService.saveFileToDisk(this.paragonsList);
  }

  readParagonsListFromFile() {
    // this.paragonsList = this._appService.readFromFileDisk();
  }

  clearLocalStorage() {
    localStorage.clear();
  }





  onSort({ column, direction }: SortEvent) {

    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    // sorting countries
    if (direction === '') {
      this.paragonsList = PARAGON_HISTORY;
    } else {
      this.paragonsList = [...PARAGON_HISTORY].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }
}


