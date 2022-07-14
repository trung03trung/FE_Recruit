import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsRegisterComponent } from './jobs-register.component';

describe('JobsRegisterComponent', () => {
  let component: JobsRegisterComponent;
  let fixture: ComponentFixture<JobsRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobsRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobsRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
