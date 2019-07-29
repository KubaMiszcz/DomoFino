import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParagonsSummaryComponent } from './paragons-summary.component';

describe('ParagonsSummaryComponent', () => {
  let component: ParagonsSummaryComponent;
  let fixture: ComponentFixture<ParagonsSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParagonsSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParagonsSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
