import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelDetailsComponentComponent } from './hotel-details-component.component';

describe('HotelDetailsComponentComponent', () => {
  let component: HotelDetailsComponentComponent;
  let fixture: ComponentFixture<HotelDetailsComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HotelDetailsComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelDetailsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
