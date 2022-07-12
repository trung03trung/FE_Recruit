import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListjeComponent } from './listje.component';

describe('ListjeComponent', () => {
  let component: ListjeComponent;
  let fixture: ComponentFixture<ListjeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListjeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListjeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
