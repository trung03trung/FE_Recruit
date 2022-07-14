import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailJobregisComponent } from './detail-jobregis.component';

describe('DetailJobregisComponent', () => {
  let component: DetailJobregisComponent;
  let fixture: ComponentFixture<DetailJobregisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailJobregisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailJobregisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
