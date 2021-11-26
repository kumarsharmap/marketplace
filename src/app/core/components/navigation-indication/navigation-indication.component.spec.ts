import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationIndicationComponent } from './navigation-indication.component';

describe('Navigation IndicationComponent', () => {
    let component: NavigationIndicationComponent;
    let fixture: ComponentFixture<NavigationIndicationComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [NavigationIndicationComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(NavigationIndicationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
