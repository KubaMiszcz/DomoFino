import { CategoryService } from 'src/app/services/category.service';
import { ICategory, Category } from './../../models/category';
import { Component, OnInit } from '@angular/core';
import { IParagon } from 'src/app/models/paragon';
import { ParagonService } from 'src/app/services/paragon.service';
import { AppUserService } from 'src/app/services/app-user.service';
import { log } from 'util';
import { ISummaryItem, SummaryItem } from 'src/app/models/summary-item';
import { DatePipe } from '@angular/common';
import { IMonth, Month } from 'src/app/models/month';




@Component({
  selector: 'app-paragons-summary',
  templateUrl: './paragons-summary.component.html',
  styleUrls: ['./paragons-summary.component.css']
})
export class ParagonsSummaryComponent implements OnInit {
  summaryList: ISummaryItem[] = [];
  currentYear: number;
  yearsList: Set<number> = new Set();
  currentMonth: IMonth;
  monthsList: IMonth[] = [];
  currentCategory: ICategory;
  categories: ICategory[];
  currentParagonList: IParagon[];
  filteredParagonList: IParagon[];

  constructor(
    private _ParagonService: ParagonService,
    private _AppUserService: AppUserService,
    private _CategoryService: CategoryService,
    private datePipe: DatePipe
  ) {
    // this.monthsList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  }

  ngOnInit() {
    this.categories = this._CategoryService.categories;
    this._CategoryService.categoriesEmitter.subscribe(data => this.categories);
    this._CategoryService.emitCategories();
    this.currentCategory = this.categories[0];
    this.InitCategoryDropdown();

    // const c = new Category(); c.Id = 0; c.Name = 'Kategoria...';
    // this.categories.push(c);
    // this.currentCategory = this.categories.find(x => x.Id === 0);

    this.currentParagonList = this._ParagonService.paragonHistory;
    this._ParagonService.paragonHistoryEmitter.subscribe(data => this.currentParagonList);
    this._ParagonService.emitParagonHistory();
    this.filteredParagonList = this.currentParagonList;

    this.yearsList = this.InitYearDropdown(this.currentParagonList);
    this.currentYear = new Date().getFullYear();

    this.monthsList = this.InitMonthsListDropdown(this.currentParagonList);
    this.currentMonth = this.monthsList[new Date().getMonth()];

    this.InitSummaryList(this.categories);
    this.FilterSummaryList(this.currentYear, this.currentMonth, this.currentCategory);
  }

  InitYearDropdown(paragonList: IParagon[]): Set<number> {
    const set = new Set<number>();
    paragonList.forEach(element => {
      set.add(new Date(element.PurchaseDate).getFullYear());
    });
    return set;
  }


  InitMonthsListDropdown(paragonList: IParagon[]): IMonth[] {
    const lst = [];
    let month;
    for (let index = 1; index < 13; index++) {
      month = new Month();
      month.OrderNo = index;
      const name = new Date();
      name.setMonth(index - 1);
      month.Name = this.datePipe.transform(name, 'MMMM');
      lst.push(month);
    }
    month = new Month();
    month.OrderNo = 0;
    month.Name = 'Wszystkie...';
    lst.push(month);
    return lst;
  }

  InitCategoryDropdown() {
    const cat = new Category();
    cat.Id = 0;
    cat.Name = 'Wszystkie...';
    this.categories.push(cat);
    this.currentCategory = cat;
  }

  InitSummaryList(categories: ICategory[]) {
    this.summaryList = [];
    categories.forEach(element => {
      const si = new SummaryItem();
      si.Category = element;
      si.Total = 0;
      this.summaryList.push(si);
    });
  }

  onSort(val: any) { }

  // FillSummaryList(paragonList: IParagon[]) {
  //   this.InitSummaryList(this.categories);
  //   paragonList.forEach(element => {
  //     const item = this.summaryList.find(x => x.Category.Id === element.Category.Id);
  //     item.Total += element.Amount;
  //   });
  // }

  FilterSummaryList(year: number, month: IMonth, category: ICategory) {
    this.InitSummaryList(this.categories);

    this.filteredParagonList = this.currentParagonList.filter(x => new Date(x.PurchaseDate).getFullYear() === year);

    if (month.OrderNo !== 0) {
      this.filteredParagonList = this.filteredParagonList.filter(x => (new Date(x.PurchaseDate).getMonth()) + 1 === month.OrderNo);
    }

    if (category.Id !== 0) {
      this.filteredParagonList = this.filteredParagonList.filter(x => x.Category.Id === category.Id);
      this.filteredParagonList = this.filteredParagonList.sort((val1, val2) => {
        return <any>new Date(val2.PurchaseDate) - <any>new Date(val1.PurchaseDate);
      });
    } else {
      this.filteredParagonList.forEach(paragon => {
        const summaryItem = this.summaryList.find(x => x.Category.Id === paragon.Category.Id);
        summaryItem.Total += paragon.Amount;
      });
    }
    // this.FillSummaryList(this.filteredParagonList);

  }
}

