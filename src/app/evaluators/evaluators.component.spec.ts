import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluatorsComponent } from './evaluators.component';

describe('EvaluatorsComponent', () => {
  let component: EvaluatorsComponent;
  let fixture: ComponentFixture<EvaluatorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluatorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
