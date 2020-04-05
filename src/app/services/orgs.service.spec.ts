import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { OrgsService } from './orgs.service';

describe('OrgService', () => {
  let service: OrgsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpClientModule]
    });
    service = TestBed.inject(OrgsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
