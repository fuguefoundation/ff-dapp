import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { EvaluatorsComponent } from './evaluators.component';
import { EvaluatorsService } from '../services/evaluators.service';

describe('EvaluatorsComponent', () => {
  let component: EvaluatorsComponent;
  let fixture: ComponentFixture<EvaluatorsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluatorsComponent ],
      imports : [HttpClientModule],
      providers: [EvaluatorsService]
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
