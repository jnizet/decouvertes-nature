import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: 'dn-icon'
})
export class IconDirective implements AfterViewInit {
  @Input() icon!: string;

  constructor(private element: ElementRef) {}

  ngAfterViewInit(): void {
    this.element.nativeElement.innerHTML = this.icon;
  }
}
