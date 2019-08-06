import { Component, OnInit } from "@angular/core";
import { IParagon } from "../models/paragon";
import { ParagonService } from "../services/paragon.service";

@Component({
  selector: "app-settings",
  templateUrl: "./app-settings.component.html",
  styleUrls: ["./app-settings.component.css"]
})
export class AppSettingsComponent implements OnInit {
  images = [1, 2, 3].map(
    () =>
      `http://stupidstuff.org/kitten/kitten${Math.round(
        Math.ceil(Math.random() * 100)
      )
        .toString()
        .padStart(3, "0")}.jpg`
  );

  deletedParagonHistory: IParagon[];
  showRecycleBinList: boolean;

  constructor(private _ParagonService: ParagonService) { }

  ngOnInit() {
    this.deletedParagonHistory = this._ParagonService.deletedParagonHistory;

    this._ParagonService.deletedParagonHistoryEmitter.subscribe(
      data => {
        this.deletedParagonHistory = data;
      },
      () => { },
      () => {
        console.log("this._ParagonService.paragonHistoryEmitter completed paragonsWithDeletePendingList", this.deletedParagonHistory);
      }
    );

    this._ParagonService.emitParagonHistory();
  }

  emptyRecycleBin() {
    this._ParagonService.EmptyRecycleBinPermanently();
  }
}
