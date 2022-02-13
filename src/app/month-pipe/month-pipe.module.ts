import { NgModule } from '@angular/core';
import { MonthPipe } from './month.pipe';

@NgModule({
  declarations: [MonthPipe],
  exports: [MonthPipe]
})
export class MonthPipeModule {}
