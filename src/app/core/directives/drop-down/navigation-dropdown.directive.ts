import {
  Directive, ElementRef, HostBinding, HostListener, Input
} from '@angular/core';

@Directive({
  selector: '[appNavigationDropdown]',
})
export class NavigationDropdownDirective {
  @HostBinding('class.w--open') public isOpen = false;

  constructor(private el: ElementRef) { }

  @HostListener('document:click', ['$event'])
  onClick(event): void {
    if (this.el.nativeElement.contains(event.target)) {
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        this.el.nativeElement
          .querySelector('.drop-nav')
          .classList.add('w--open');
      } else {
        this.el.nativeElement
          .querySelector('.drop-nav')
          .classList.remove('w--open');
      }
    } else {
      this.el.nativeElement
        .querySelector('.drop-nav')
        .classList.remove('w--open');
    }
  }
}
