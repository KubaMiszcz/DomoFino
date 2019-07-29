import { IParagon, Paragon } from 'src/app/models/paragon';
import { Injectable, Output, EventEmitter, OnInit } from '@angular/core';
import { IAppUser, AppUsers } from './models/app-user';
import { ICategory, Categories } from './models/category';
import { Observable } from 'rxjs';
import ParagonHistoryJSON from '../assets/paragon-history.json';
import { saveAs } from 'file-saver';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AppService {
  user: IAppUser;
  categories: ICategory[];

  @Output() currentUserEmitter: EventEmitter<IAppUser> = new EventEmitter<IAppUser>();
  @Output() categoriesEmitter: EventEmitter<ICategory[]> = new EventEmitter<ICategory[]>();

  constructor(private http: HttpClient) {
    console.log('appservice ctro');
    this.user = AppUsers[1];
    this.categories = Categories;
    console.log(this.categories,'ssssrvice');

  }

  saveFileToDisk(list: IParagon[]) {
    const fileJson = new Blob([JSON.stringify(list)], { type: 'application/json' });
    saveAs(fileJson, 'paragon-history.json');
    console.log(fileJson);

    // const blob = new Blob(['hello world'], { type: 'text/csv;charset=utf-8' });
    // saveAs(blob, 'helloworld.csv');
    // console.log(blob);
  }

  readFromFileDisk(): any {
    return ParagonHistoryJSON;
  }

  readFromLocalStorage(): any {
    const lst = JSON.parse(localStorage.getItem('paragonlist'));
    console.log(lst);
    // tslint:disable-next-line: triple-equals
    if (lst === null) {
      return [];
    } else {
      return lst;
    }
  }

  readFromMega() {
    console.log('start1');
    let a: any;
    let b: any;
    this.http.get('https://mega.nz/#!eI8WBQbZ!ePyzAhhGSHq8tRpWhimfnsYN-g47JMjm8-zWtxBtSV4')
      .pipe(
        map(response => b = response,
          () => {
            console.log(b);
          }
        ));

    // return this.http.get<any>('https://mega.nz/#!eI8WBQbZ');

  }

  saveToLocalStorage(list: IParagon[]) {
    localStorage.setItem('paragonlist', JSON.stringify(list));
  }

  // loadFromFile(): Observable<any> {

  //   if (!Folder.exists(documents.path + '/' + folder)) {
  //     return Observable.throw(`Folder not exist ${documents.path + '/' + folder}`);
  //   }
  //   const _folder = documents.getFolder(folder);

  //   if (!File.exists(documents.path + '/' + folder + '/' + file)) {
  //     return Observable.throw(`File not exist ${_folder.path}`);
  //   }
  //   let jsonFile = _folder.getFile(file);
  //   return Observable.fromPromise(jsonFile.readText())
  //     .map((content) => {
  //       return { data: JSON.parse(content), language: language };
  //     });
  // }
  // }

}



