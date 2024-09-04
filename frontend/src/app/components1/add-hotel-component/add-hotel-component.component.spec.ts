import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHotelComponentComponent } from './add-hotel-component.component';

describe('AddHotelComponentComponent', () => {
  let component: AddHotelComponentComponent;
  let fixture: ComponentFixture<AddHotelComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddHotelComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddHotelComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
