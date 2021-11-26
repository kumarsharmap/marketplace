import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageUserManagementComponent } from './manage-user-management.component';

describe('ManageUserManagementComponent', () => {
  let component: ManageUserManagementComponent;
  let fixture: ComponentFixture<ManageUserManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageUserManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageUserManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
