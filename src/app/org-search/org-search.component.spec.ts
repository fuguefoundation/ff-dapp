import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { OrgsService } from '../services/orgs.service';
import { OrgSearchComponent } from './org-search.component';

describe('OrgSearchComponent', () => {
  let component: OrgSearchComponent;
  let fixture: ComponentFixture<OrgSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgSearchComponent ],
      imports : [HttpClientModule],
      providers: [OrgsService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
