import { Component, OnInit } from "@angular/core";
import { AppService, frontVersion } from "../services/app.service";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.css"]
})
export class FooterComponent implements OnInit {
  frontInfo: string = frontVersion;
  constructor(private _AppService: AppService) { }

  ngOnInit() {
    this._AppService.getBuildInfo().subscribe(data => console.log('APIv. ', data, 'FrontV.', this.frontInfo));
  }
}
