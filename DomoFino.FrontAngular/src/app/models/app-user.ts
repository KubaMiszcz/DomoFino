export interface IAppUser {
  Id: number;
  Username: string;
  Fullname: string;
}

export class AppUser {
  Id: number;
  Username: string;
  Fullname: string;
}

export const APPUSERS: IAppUser[] = [
  {
    Id: 1,
    Username: 'kuba',
    Fullname: 'KubaMiszcz'
  },
  {
    Id: 2,
    Username: 'ula',
    Fullname: 'Urszulka Slodziuchna'
  }
];

