import { Component, OnInit, Directive, Input, Output, EventEmitter, QueryList, ViewChildren } from '@angular/core';
import { IParagon, ParagonsList, Paragon } from 'src/app/models/paragon';
import { ICategory } from 'src/app/models/category';
import { AppServiceService } from 'src/app/app-service.service';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

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
    this.sort.emit({column: this.sortable, direction: this.direction});
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
  // images = [1, 2, 3].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);
  images = [1, 2, 3].map(() => `http://stupidstuff.org/kitten/kitten${Math.round(Math.ceil(Math.random() * 100)).toString().padStart(3, '0')}.jpg`);

  currentParagonPurchaseDate: NgbDateStruct;
  currentParagonCategory: string;
  currentParagonAmount: number;
  currentParagonNote: string;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(
    private _appService: AppServiceService,
    private calendar: NgbCalendar) {
  }

  ngOnInit() {
    this.currentParagonPurchaseDate = this.calendar.getToday();
    this.currentParagonCategory = 'Kategoria';
    // this.currentParagonAmount = 0.00;
    this.currentParagonNote = '';
    this.paragonsList = ParagonsList;
    this.categories = this._appService.categories;
    // this.categories = this._appService.categories;
  }

  setCategory(category: string) {
    this.currentParagonCategory = category;
  }

  addParagon(): void {
    const paragonToAdd = new Paragon();
    paragonToAdd.PurchaseDate = new Date
      (
        this.currentParagonPurchaseDate.year,
        this.currentParagonPurchaseDate.month,
        this.currentParagonPurchaseDate.day
      );

    paragonToAdd.Category = this.currentParagonCategory;
    paragonToAdd.Amount = this.currentParagonAmount;
    paragonToAdd.Note = this.currentParagonNote;

    this.paragonsList.push(paragonToAdd);
    // this.paragonsList = this.paragonsList.sort(function (a, b) => {
    //   a.PurchaseDate > b.PurchaseDate ? 1 : a.PurchaseDate < b.PurchaseDate ? -1 : 0;
    // });

    this.currentParagonAmount = 0.00;
    this.currentParagonNote = '';
  }

  onSort({column, direction}: SortEvent) {

    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    // sorting countries
    if (direction === '') {
      this.paragonsList = ParagonsList;
    } else {
      this.paragonsList = [...ParagonsList].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }
}


