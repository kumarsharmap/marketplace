import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelloMarketplaceComponent } from './hello-marketplace.component';

describe('HelloMarketplaceComponent', () => {
  let component: HelloMarketplaceComponent;
  let fixture: ComponentFixture<HelloMarketplaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelloMarketplaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HelloMarketplaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
