export interface ICategory {
  Id: number;
  Name: string;
  IconName: string;
  BackgroundColor: string;
}

export class Category implements ICategory {
  Id: number;
  Name: string;
  IconName: string;
  BackgroundColor: string;
}

// export const CATEGORIES: ICategory[] = [
//   {
//     Id: 1,
//     Name: 'jedzonko'
//   },
//   {
//     Id: 2,
//     Name: 'przemyslowe'
//   },
//   {
//     Id: 3,
//     Name: 'inne'
//   },
//   {
//     Id: 4,
//     Name: 'zbytki'
//   },
// ];

