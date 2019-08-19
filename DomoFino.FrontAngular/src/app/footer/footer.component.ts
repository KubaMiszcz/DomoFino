import { Component, OnInit } from "@angular/core";
import { AppService, frontVersion } from "../services/app.service";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.css"]
})
export class FooterComponent implements OnInit {
  frontIndfo: string = frontVersion;
  constructor(private _AppService: AppService) { }

  ngOnInit() {

    this._AppService.getBuildInfo().subscribe(
      data => {
        this.frontIndfo = data;
        console.log('APIv. ', data, 'FrontV.', this.frontIndfo);
      });
  }
}
