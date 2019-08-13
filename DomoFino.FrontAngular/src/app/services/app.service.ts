import { AppUserService } from "./app-user.service";
import { Injectable, Output, EventEmitter, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { saveAs } from "file-saver";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

// export const API_URL: string = 'http://domofinoapi.hostingasp.pl/api/';
export const API_URL: string = "http://localhost:44351/api/";

@Injectable({
  providedIn: "root"
})
export class AppService {
  buildInfo: "no info";

  constructor(private http: HttpClient, private _router: Router) {}

  getBuildInfo(): Observable<string> {
    return this.http.get<string>(API_URL + "getBuildInfo");
  }
}
// TODO

// ParagonHistory(username: string) {
//   this.http.get<IParagon[]>(API_URL + 'Paragon/GetByUsername?' + 'username=' + username)
//     .subscribe(data => {
//       this.paragonHistory = data;
//     },
//       () => { },
//       () => {
//         this.paragonHistoryEmitter.emit(this.paragonHistory);
//         console.log('paragis', this.paragonHistory);
//       }
//     );
// }

//   this.http.get('https://mega.nz/#!eI8WBQbZ!ePyzAhhGSHq8tRpWhimfnsYN-g47JMjm8-zWtxBtSV4')
// .pipe(
//   map(response => b = response,
//     () => {
//       console.log(b);
//     }
//   ));

// }

/////////////////////
/////////////////////
/////////////////////
/////////////////////
/////////////////////

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
