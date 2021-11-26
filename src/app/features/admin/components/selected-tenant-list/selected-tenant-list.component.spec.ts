import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedTenantListComponent } from './selected-tenant-list.component';

describe('SelectedTenantListComponent', () => {
  let component: SelectedTenantListComponent;
  let fixture: ComponentFixture<SelectedTenantListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedTenantListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedTenantListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
