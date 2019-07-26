import { ICategory } from "./category";

export interface IParagon {
  purchaseDate: Date;
  priceTotal: number;
  category: ICategory;
  note: string;
}
