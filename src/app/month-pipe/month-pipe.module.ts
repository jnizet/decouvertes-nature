import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonthPipe } from './month.pipe';

@NgModule({
  declarations: [MonthPipe],
  exports: [MonthPipe]
})
export class MonthPipeModule {}
