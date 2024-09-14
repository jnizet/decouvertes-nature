import { computed, Directive, input, Signal } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'dn-icon',
  standalone: true,
  host: {
    '[innerHtml]': 'safeIcon()',
    '[attr.aria-hidden]': 'true'
  }
})
export class IconDirective {
  icon = input.required<string>();
  safeIcon: Signal<SafeHtml>;

  constructor(sanitizer: DomSanitizer) {
    this.safeIcon = computed(() => sanitizer.bypassSecurityTrustHtml(this.icon()));
  }
}
