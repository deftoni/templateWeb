import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyTeamComponent } from './agency-team.component';

describe('AgencyTeamComponent', () => {
  let component: AgencyTeamComponent;
  let fixture: ComponentFixture<AgencyTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
