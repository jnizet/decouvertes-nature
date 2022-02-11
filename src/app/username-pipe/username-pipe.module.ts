import { NgModule } from '@angular/core';
import { UsernamePipe } from './username.pipe';

@NgModule({
  declarations: [UsernamePipe],
  exports: [UsernamePipe]
})
export class UsernamePipeModule {}
