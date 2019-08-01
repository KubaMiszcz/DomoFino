import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParagonNewComponent } from './paragon-new.component';

describe('ParagonNewComponent', () => {
  let component: ParagonNewComponent;
  let fixture: ComponentFixture<ParagonNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParagonNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParagonNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
