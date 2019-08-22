import { ICategory } from './../models/category';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-category-label',
  templateUrl: './category-label.component.html',
  styleUrls: ['./category-label.component.css']
})
export class CategoryLabelComponent implements OnInit {
  @Input() category: ICategory;

  constructor() { }

  ngOnInit() {
  }

}
