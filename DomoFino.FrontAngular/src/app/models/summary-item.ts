import { ICategory } from "./category";

export interface ISummaryItem {
  Category: ICategory;
  Total: number;
}

export class SummaryItem implements ISummaryItem {
  Category: ICategory;
  Total: number;
}
