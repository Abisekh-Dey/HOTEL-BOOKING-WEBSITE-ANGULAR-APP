import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingfinalComponent } from './bookingfinal.component';

describe('BookingfinalComponent', () => {
  let component: BookingfinalComponent;
  let fixture: ComponentFixture<BookingfinalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookingfinalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingfinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
