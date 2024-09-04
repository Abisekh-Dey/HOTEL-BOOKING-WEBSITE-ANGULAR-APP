import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllbookingbyuserComponent } from './allbookingbyuser.component';

describe('AllbookingbyuserComponent', () => {
  let component: AllbookingbyuserComponent;
  let fixture: ComponentFixture<AllbookingbyuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllbookingbyuserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllbookingbyuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
