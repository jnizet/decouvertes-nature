import { DestroyRef, Directive, effect, inject, input } from '@angular/core';
import { Title } from '@angular/platform-browser';

const DEFAULT_TITLE = 'Découvertes Nature';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'dn-page-title'
})
export class PageTitleDirective {
  title = input.required<string>();

  constructor() {
    const titleService = inject(Title);
    const destroyRef = inject(DestroyRef);

    effect(() => {
      titleService.setTitle(`${this.title()} - ${DEFAULT_TITLE}`);
    });

    destroyRef.onDestroy(() => titleService.setTitle(DEFAULT_TITLE));
  }
}
