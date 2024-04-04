import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFullJobsComponent } from './view-full-jobs.component';

describe('ViewFullJobsComponent', () => {
  let component: ViewFullJobsComponent;
  let fixture: ComponentFixture<ViewFullJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewFullJobsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewFullJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
