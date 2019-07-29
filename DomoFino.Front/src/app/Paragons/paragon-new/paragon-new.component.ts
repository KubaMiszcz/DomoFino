import { AppService } from 'src/app/app-service.service';
import { IParagon, Paragon } from './../../models/paragon';
import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/models/category';

@Component({
  selector: 'app-paragon-new',
  templateUrl: './paragon-new.component.html',
  styleUrls: ['./paragon-new.component.css']
})
export class ParagonNewComponent implements OnInit {
  model: string = '';
  categories: ICategory[];
  paragon: IParagon;

  constructor(private _appService: AppService) { }

  ngOnInit() {
    this.categories = this._appService.categories;
    console.log(this.categories, 'dddd');

    this.paragon = new Paragon();
    // this.currentParagonPurchaseDate = this.calendar.getToday();
    // this.currentParagonCategory = this.categories[0].Name;
    // this.currentParagonAmount = 0;
    // this.currentParagonNote = '';
  }

}
