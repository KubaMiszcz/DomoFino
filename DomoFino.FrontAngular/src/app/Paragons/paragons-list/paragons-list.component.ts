import { Paragon, IParagon } from "../../models/paragon";
import { Component, OnInit, ViewEncapsulation, ViewChild, Input } from "@angular/core";
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
  @Input() caption: string = 'captionnn';
  isListLoading: boolean = false;

  constructor(
    private paragonService: ParagonService,
    private appUserService: AppUserService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    // this.paragonsList = this._ParagonService.paragonHistory;

    // this._ParagonService.paragonHistoryEmitter.subscribe(
    //   data => (this.paragonsList = data)
    // );
    // this._ParagonService.getParagonHistory();

    this.paragonService.isParagonHistoryLoading.subscribe(data => this.isListLoading = data);
    console.log(this.paragonsList);
  }

  renewParagonList() {
    this.paragonService.RenewParagonList();
  }

  editParagon(item: IParagon) {
    console.log('lll', this.paragonsList);

    const modalRef = this.modalService.open(EditParagonModalComponent, { centered: true })
    modalRef.componentInstance.currentParagon = item;
    modalRef.result.then(data => {
      if (typeof (data) === typeof (new Paragon())) {
        this.paragonService.UpdateParagon(data);
      }
      console.log('msg', data);
    });
  }

  onSort(val: any) { }
}
