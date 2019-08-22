import { Component, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-num-pad',
  templateUrl: './num-pad.component.html',
  styleUrls: ['./num-pad.component.css'],
  // encapsulation: ViewEncapsulation.None
})
export class NumPadComponent implements OnInit {
  result: number = 0;
  expression: string = '';

  constructor(public activeModal: NgbActiveModal,
  ) { }

  ngOnInit() {
    console.log('numstart');
  }

  onKeyClick(value) {
    this.expression += value[0];
    console.log(value, this.expression);
  }

  evaluateExpression() {
    this.result = eval(this.expression);
    console.log(this.result);
    this.expression = this.result.toFixed(2);
  }

  clearExpression() {
    this.result = 0;
    this.expression = '';
    console.log(this.result, this.expression);
  }

  backspaceExpression() {
    this.expression = this.expression.slice(0, this.expression.length - 1);
    console.log(this.result, this.expression);
  }

  acceptResult() {
    this.evaluateExpression();
    this.activeModal.close(this.result);
  }

  close(str: string) {
    this.activeModal.close('0.00');
  }
}
