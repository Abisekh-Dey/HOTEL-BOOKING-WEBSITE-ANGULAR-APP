import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSingupComponent } from './admin-singup.component';

describe('AdminSingupComponent', () => {
  let component: AdminSingupComponent;
  let fixture: ComponentFixture<AdminSingupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminSingupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSingupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
