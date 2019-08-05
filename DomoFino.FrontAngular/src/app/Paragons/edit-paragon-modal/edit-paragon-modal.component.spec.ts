import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditParagonModalComponent } from './edit-paragon-modal.component';

describe('EditParagonModalComponent', () => {
  let component: EditParagonModalComponent;
  let fixture: ComponentFixture<EditParagonModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditParagonModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditParagonModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
