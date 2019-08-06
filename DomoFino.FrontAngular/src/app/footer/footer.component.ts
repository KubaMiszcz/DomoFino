import { Component, OnInit } from "@angular/core";
import { AppService } from "../services/app.service";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.css"]
})
export class FooterComponent implements OnInit {
  buildIndfo: string;
  constructor(private _AppService: AppService) {}

  ngOnInit() {
    this.buildIndfo = this._AppService.buildInfo;
    this._AppService.getBuildInfo().subscribe(
      data => {
        this.buildIndfo = data;
      },
      () => {},
      () => {
        console.log('_AppService.getBuildInfo completed buildIndfo', this.buildIndfo);
      }
    );
  }
}
