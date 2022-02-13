import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconDirective } from './icon.directive';

@NgModule({
  declarations: [IconDirective],
  exports: [IconDirective],
  imports: [CommonModule]
})
export class IconModule {}
