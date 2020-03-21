import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardDonateComponent } from './dashboard-donate.component';

describe('DashboardDonateComponent', () => {
  let component: DashboardDonateComponent;
  let fixture: ComponentFixture<DashboardDonateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardDonateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardDonateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
