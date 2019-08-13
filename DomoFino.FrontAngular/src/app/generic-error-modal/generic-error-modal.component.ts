import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-generic-error-modal',
  templateUrl: './generic-error-modal.component.html',
  styleUrls: ['./generic-error-modal.component.scss']
})
export class GenericErrorModalComponent implements OnInit {
  @Input() public caption = 'caption';
  @Input() public message = 'message';

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
    console.log('begin', this.caption, this.message);
  }

  emitResult(str: string) {
    console.log(str);
    console.log('end', this.caption, this.message);

    this.activeModal.close(str);
  }
}
