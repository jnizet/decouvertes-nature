import { NgModule } from '@angular/core';
import { ActivityDatePipe } from './activity-date.pipe';

@NgModule({
  exports: [ActivityDatePipe],
  declarations: [ActivityDatePipe]
})
export class ActivityDatePipeModule {}
