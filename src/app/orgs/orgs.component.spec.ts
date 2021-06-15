import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { OrgsService } from '../services/orgs.service';
import { OrgsComponent } from './orgs.component';

describe('OrgsComponent', () => {
  let component: OrgsComponent;
  let fixture: ComponentFixture<OrgsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgsComponent ],
      imports : [HttpClientModule],
      providers: [OrgsService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
