export interface IMonth {
  OrderNo: number;
  Name: string;
}

export class Month implements IMonth {
  OrderNo: number;
  Name: string;
}

export const Months = [
  {
    OrderNo: 0,
    Name: "Wszystkie..."
  },
  {
    OrderNo: 1,
    Name: "Styczeń"
  },
  {
    OrderNo: 2,
    Name: "Luty"
  },
  {
    OrderNo: 3,
    Name: "Marzec"
  },
  {
    OrderNo: 4,
    Name: "Kwiecień"
  },
  {
    OrderNo: 5,
    Name: "Maj"
  },
  {
    OrderNo: 6,
    Name: "Czerwiec"
  },
  {
    OrderNo: 7,
    Name: "Lipiec"
  },
  {
    OrderNo: 8,
    Name: "Sierpień"
  },
  {
    OrderNo: 9,
    Name: "Wrzesień"
  },
  {
    OrderNo: 10,
    Name: "Październik"
  },
  {
    OrderNo: 11,
    Name: "Listopad"
  },
  {
    OrderNo: 12,
    Name: "Grudzień"
  }
]
