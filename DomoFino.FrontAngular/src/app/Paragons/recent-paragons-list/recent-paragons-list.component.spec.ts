import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentParagonsListComponent } from './recent-paragons-list.component';

describe('RecentParagonsListComponent', () => {
  let component: RecentParagonsListComponent;
  let fixture: ComponentFixture<RecentParagonsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentParagonsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentParagonsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
