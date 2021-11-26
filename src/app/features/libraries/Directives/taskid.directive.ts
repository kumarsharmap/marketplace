import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appTaskid]'
})
export class TaskIdDirective {
  @HostBinding('class.w--open') public isOpen = false;
  constructor(public el: ElementRef) { }
  @HostListener('document:click', ['$event'])
  public onClick(event): void {
    if (this.el.nativeElement.contains(event.target)) {
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        this.el.nativeElement.querySelector('.drop-nav').classList.add('w--open');
      } else {
        this.el.nativeElement.querySelector('.drop-nav').classList.remove('w--open');
      }
    } else {
      this.el.nativeElement.querySelector('.drop-nav').classList.remove('w--open');
    }
  }
}