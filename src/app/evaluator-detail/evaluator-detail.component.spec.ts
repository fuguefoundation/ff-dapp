import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluatorDetailComponent } from './evaluator-detail.component';

describe('EvaluatorDetailComponent', () => {
  let component: EvaluatorDetailComponent;
  let fixture: ComponentFixture<EvaluatorDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluatorDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluatorDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
