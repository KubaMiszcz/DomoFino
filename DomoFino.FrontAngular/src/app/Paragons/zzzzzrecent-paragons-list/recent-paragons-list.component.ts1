import { Paragon } from "./../../models/paragon";
import { IParagon } from "src/app/models/paragon";
import { Component, OnInit, ViewEncapsulation, ViewChild } from "@angular/core";
import { ParagonService } from "src/app/services/paragon.service";
import { AppUserService } from "src/app/services/app-user.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { EditParagonModalComponent } from "../edit-paragon-modal/edit-paragon-modal.component";

@Component({
  selector: "app-recent-paragons-list",
  templateUrl: "./recent-paragons-list.component.html",
  styleUrls: ["./recent-paragons-list.component.css"]
})
export class RecentParagonsListComponent implements OnInit {
  recentParagonsList: IParagon[];

  constructor(
    private _ParagonService: ParagonService,
    private _AppUserService: AppUserService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.recentParagonsList = this._ParagonService.paragonHistory;

    this._ParagonService.paragonHistoryEmitter.subscribe(
      data => (this.recentParagonsList = data)
    );
    this._ParagonService.getParagonHistory();

    console.log(this.recentParagonsList);
  }

  editParagon(item: IParagon) {
    const modalRef = this.modalService.open(EditParagonModalComponent, {
      centered: true
    });
    modalRef.componentInstance.paragon = item;
  }

  onSort(val: any) {}
}
