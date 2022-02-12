import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityTypePipe } from './activity-type.pipe';

@NgModule({
  declarations: [ActivityTypePipe],
  exports: [ActivityTypePipe]
})
export class ActivityTypePipeModule {}
