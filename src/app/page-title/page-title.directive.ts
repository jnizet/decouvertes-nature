import { DestroyRef, Directive, effect, input } from '@angular/core';
import { Title } from '@angular/platform-browser';

const DEFAULT_TITLE = 'Découvertes Nature';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'dn-page-title',
  standalone: true
})
export class PageTitleDirective {
  title = input.required<string>();

  constructor(titleService: Title, destroyRef: DestroyRef) {
    effect(() => {
      titleService.setTitle(`${this.title()} - ${DEFAULT_TITLE}`);
    });

    destroyRef.onDestroy(() => titleService.setTitle(DEFAULT_TITLE));
  }
}
