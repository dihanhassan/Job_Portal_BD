import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewApplicantComponent } from './view-applicant.component';

describe('ViewApplicantComponent', () => {
  let component: ViewApplicantComponent;
  let fixture: ComponentFixture<ViewApplicantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewApplicantComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewApplicantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
