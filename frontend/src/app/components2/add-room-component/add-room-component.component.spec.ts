import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRoomComponentComponent } from './add-room-component.component';

describe('AddRoomComponentComponent', () => {
  let component: AddRoomComponentComponent;
  let fixture: ComponentFixture<AddRoomComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddRoomComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRoomComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
