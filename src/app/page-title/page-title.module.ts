import { NgModule } from '@angular/core';
import { PageTitleDirective } from './page-title.directive';

@NgModule({
  exports: [PageTitleDirective],
  declarations: [PageTitleDirective]
})
export class PageTitleModule {}
