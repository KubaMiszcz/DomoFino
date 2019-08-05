import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParagonsListComponent } from './paragons-list.component';

describe('ParagonsListComponent', () => {
  let component: ParagonsListComponent;
  let fixture: ComponentFixture<ParagonsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParagonsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParagonsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
