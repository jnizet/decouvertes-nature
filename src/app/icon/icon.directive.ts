import { Directive, HostBinding, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Directive({
  selector: 'dn-icon'
})
export class IconDirective {
  @HostBinding('innerHTML')
  safeIcon?: SafeHtml;

  @Input() set icon(icon: string) {
    this.safeIcon = this.sanitizer.bypassSecurityTrustHtml(icon);
  }

  @HostBinding('attr.aria-hidden')
  ariaHidden = true;

  constructor(private sanitizer: DomSanitizer) {}
}
