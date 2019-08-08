import { Injectable, EventEmitter, Output } from "@angular/core";
import { AppService, API_URL } from "./app.service";
import { ICategory, Category } from "../models/category";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class CategoryService {
  categories: ICategory[] = [];
  @Output() categoriesEmitter: EventEmitter<ICategory[]> = new EventEmitter<ICategory[]>();

  constructor(
    private _appService: AppService,
    private http: HttpClient,
    private _router: Router
  ) {
    this.categories = [];
    const dummyCategory = new Category();
    dummyCategory.Name = "empty";
    this.categories.push(dummyCategory);
    this.categories.push(dummyCategory);
    this.categories.push(dummyCategory);

    this.getCategories();
  }

  fetchCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(API_URL + "category/GetAll");
  }

  getCategories() {
    this.fetchCategories().subscribe(
      data => (this.categories = data),
      () => { },
      () => {
        this.CheckColors();
        this.emitCategories();
        console.log("service loaded", this.categories);
      }
    );
  }

  CheckColors() {
    this.categories.forEach(element => {
      if (element.BackgroundColor === null) {
        element.BackgroundColor = "#ffffff";
      }
    });
  }

  emitCategories() {
    this.categoriesEmitter.emit(this.categories);
  }
}

// export const API_URL: string = 'http://domofinoapi.hostingasp.pl/api/';
// // export const API_URL: string = 'https://localhost:44351/api/';

// @Injectable({
//   providedIn: 'root'
// })
// export class AppService {
//   currentUser: IAppUser = new AppUser();
//   categories: ICategory[] = [];
//   paragonHistory: IParagon[] = [];

//   @Output() currentUserEmitter: EventEmitter<IAppUser> = new EventEmitter<IAppUser>();
//   @Output() categoriesEmitter: EventEmitter<ICategory[]> = new EventEmitter<ICategory[]>();
//   @Output() paragonHistoryEmitter: EventEmitter<IParagon[]> = new EventEmitter<IParagon[]>();

//   constructor(
//     private http: HttpClient,
//     private _router: Router
//   ) {
//     this.fetchCategories();
//     console.log(this.categories, 'categorsie... ssssrvice start');
//   }

//   login(username: string) {
//     this.currentUser.Username = username;
//     this.fetchCurrentUser();

//     this.http.get<IAppUser>(API_URL + 'user/GetByUsername?username=' + username).subscribe(data => {
//       this.currentUser = data;
//     },
//       () => { },
//       () => {
//         localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
//         this.currentUserEmitter.emit(this.currentUser);
//         this._router.navigate(['/main-page']);
//       }
//     );
//   }

//   fetchCurrentUser() {
//     this.http.get<IAppUser>(API_URL + 'user/GetByUsername?username=' + this.currentUser.Username)
//       .subscribe(data => this.currentUser = data, () => { },
//         () => {
//           localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
//           this.emitCurrentUser();
//           this._router.navigate(['/main-page']);
//         }
//       );
//   }

//   emitCurrentUser() {
//     this.currentUserEmitter.emit(this.currentUser);
//   }

//   getCurrentUser(): IAppUser {
//     if (this.currentUser == null) {
//       this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
//       if (this.currentUser == null) {
//         this._router.navigate(['/login']);
//       }
//     }
//     return this.currentUser;
//   }

//   logout() {
//     this.currentUser = null;
//     localStorage.removeItem('currentUser');
//     console.log('logged out');
//   }

//   fetchCategories(): Observable<ICategory[]> {
//     return this.http.get<ICategory[]>(API_URL + 'category/GetAll');
//   }

//   getCategories() {
//     this.fetchCategories().subscribe(data =>
//       this.categories = data, () => { }, () => this.emitCategories()
//     );
//   }

//   emitCategories() {
//     this.categoriesEmitter.emit(this.categories);
//   }

//   fetchParagonHistory(): Observable<IParagon[]> {
//     return this.http.get<IParagon[]>(API_URL + 'Paragon/GetByUsername?' + 'username=' + this.currentUser.Username);
//   }

//   getParagonHistory() {
//     this.fetchParagonHistory().subscribe(data => this.paragonHistory = data, () => { },
//       () => this.emitParagonHistory());
//   }

//   emitParagonHistory() {
//     this.paragonHistoryEmitter.emit(this.paragonHistory);
//   }

//   // ParagonHistory(username: string) {
//   //   this.http.get<IParagon[]>(API_URL + 'Paragon/GetByUsername?' + 'username=' + username)
//   //     .subscribe(data => {
//   //       this.paragonHistory = data;
//   //     },
//   //       () => { },
//   //       () => {
//   //         this.paragonHistoryEmitter.emit(this.paragonHistory);
//   //         console.log('paragis', this.paragonHistory);
//   //       }
//   //     );
//   // }

//   //   this.http.get('https://mega.nz/#!eI8WBQbZ!ePyzAhhGSHq8tRpWhimfnsYN-g47JMjm8-zWtxBtSV4')
//   // .pipe(
//   //   map(response => b = response,
//   //     () => {
//   //       console.log(b);
//   //     }
//   //   ));

//   // }

//   /////////////////////
//   /////////////////////
//   /////////////////////
//   /////////////////////
//   /////////////////////

//   saveFileToDisk(list: IParagon[]) {
//     const fileJson = new Blob([JSON.stringify(list)], { type: 'application/json' });
//     saveAs(fileJson, 'paragon-history.json');
//     console.log(fileJson);

//     // const blob = new Blob(['hello world'], { type: 'text/csv;charset=utf-8' });
//     // saveAs(blob, 'helloworld.csv');
//     // console.log(blob);
//   }

//   readFromFileDisk(): any {
//     return PARAGON_HISTORY;
//   }

//   readFromLocalStorage(): any {
//     const lst = JSON.parse(localStorage.getItem('paragonlist'));
//     console.log(lst);
//     // tslint:disable-next-line: triple-equals
//     if (lst === null) {
//       return [];
//     } else {
//       return lst;
//     }
//   }

//   readFromMega() {
//     console.log('start1');
//     let a: any;
//     let b: any;
//     this.http.get('https://mega.nz/#!eI8WBQbZ!ePyzAhhGSHq8tRpWhimfnsYN-g47JMjm8-zWtxBtSV4')
//       .pipe(
//         map(response => b = response,
//           () => {
//             console.log(b);
//           }
//         ));

//     // return this.http.get<any>('https://mega.nz/#!eI8WBQbZ');

//   }

//   saveToLocalStorage(list: IParagon[]) {
//     localStorage.setItem('paragonlist', JSON.stringify(list));
//   }

//   // loadFromFile(): Observable<any> {

//   //   if (!Folder.exists(documents.path + '/' + folder)) {
//   //     return Observable.throw(`Folder not exist ${documents.path + '/' + folder}`);
//   //   }
//   //   const _folder = documents.getFolder(folder);

//   //   if (!File.exists(documents.path + '/' + folder + '/' + file)) {
//   //     return Observable.throw(`File not exist ${_folder.path}`);
//   //   }
//   //   let jsonFile = _folder.getFile(file);
//   //   return Observable.fromPromise(jsonFile.readText())
//   //     .map((content) => {
//   //       return { data: JSON.parse(content), language: language };
//   //     });
//   // }
//   // }

// }
