import { Directive, Input, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';

const DEFAULT_TITLE = 'Découvertes Nature';

@Directive({
  selector: 'dn-page-title'
})
export class PageTitleDirective implements OnDestroy {
  @Input()
  set title(title: string) {
    this.titleService.setTitle(`${title} - ${DEFAULT_TITLE}`);
  }

  constructor(private titleService: Title) {}

  ngOnDestroy(): void {
    this.titleService.setTitle(DEFAULT_TITLE);
  }
}
