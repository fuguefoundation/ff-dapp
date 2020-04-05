import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { EvaluatorsService } from './evaluators.service';
import { DebugService } from './debug.service';

describe('EvaluatorsService', () => {
  let service: EvaluatorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpClientModule],
        providers: [DebugService]
    });
    service = TestBed.inject(EvaluatorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
