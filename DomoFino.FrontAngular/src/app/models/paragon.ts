import { ICategory } from "src/app/models/category";
export interface IParagon {
  Id: number;
  Amount: number;
  PurchaseDate: Date;
  Note: string;
  Category: ICategory;
  AddedById: number;
  IsDeletePending: boolean;
}

export class Paragon implements IParagon {
  Id: number;
  Amount: number;
  PurchaseDate: Date;
  Note: string;
  Category: ICategory;
  AddedById: number;
  IsDeletePending: boolean;
}



export const PARAGON_HISTORY: IParagon[] = [
  // {
  //   'Id': 1,
  //   'Amount': 12.22,
  //   'PurchaseDate': new Date,
  //   'Note': 'bulki',
  //   'Category': 'jedzonko',
  //   'AddedBy': 'ula'
  // },
  // {
  //   'Id': 2,
  //   'Amount': 32.22,
  //   'PurchaseDate': new Date,
  //   'Note': 'boczek',
  //   'Category': 'jedzonko',
  //   'AddedBy': 'ula'
  // },
  // {
  //   'Id': 3,
  //   'Amount': 2112.22,
  //   'PurchaseDate': new Date,
  //   'Note': 'canon',
  //   'Category': 'ulowe',
  //   'AddedBy': 'ula'
  // },
  // {
  //   'Id': 4,
  //   'Amount': 112.22,
  //   'PurchaseDate': new Date,
  //   'Note': 'jajka',
  //   'Category': 'jedzonko',
  //   'AddedBy': 'ula'
  // },
  // {
  //   'Id': 5,
  //   'Amount': 2112.22,
  //   'PurchaseDate': new Date,
  //   'Note': 'zurek',
  //   'Category': {''}},
  //   'AddedBy': 'ula'
  // },
];
