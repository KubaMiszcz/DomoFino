import { Paragon } from "../../models/paragon";
import { IParagon } from "src/app/models/paragon";
import {
  Component,
  OnInit,
  ViewEncapsulation,
  ViewChild,
  Input
} from "@angular/core";
import { ParagonService } from "src/app/services/paragon.service";
import { AppUserService } from "src/app/services/app-user.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { EditParagonModalComponent } from "../edit-paragon-modal/edit-paragon-modal.component";

@Component({
  selector: "app-paragons-list",
  templateUrl: "./paragons-list.component.html",
  styleUrls: ["./paragons-list.component.css"]
})
export class ParagonsListComponent implements OnInit {
  @Input() paragonsList: IParagon[];
  @Input() caption: string='captionnn';

  constructor(
    private _ParagonService: ParagonService,
    private _AppUserService: AppUserService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    // this.paragonsList = this._ParagonService.paragonHistory;

    // this._ParagonService.paragonHistoryEmitter.subscribe(
    //   data => (this.paragonsList = data)
    // );
    // this._ParagonService.getParagonHistory();

    console.log(this.paragonsList);
  }

  editParagon(item: IParagon) {
    const modalRef = this.modalService.open(EditParagonModalComponent, {
      centered: true
    });
    modalRef.componentInstance.paragon = item;
  }

  onSort(val: any) {}
}
