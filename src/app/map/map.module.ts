import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';
import { ActivitiesMapComponent } from './activities-map/activities-map.component';
import { RouterModule } from '@angular/router';
import { MAP_ROUTES } from './map.routes';
import { IconDirective } from '../icon/icon.directive';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { PageTitleDirective } from '../page-title/page-title.directive';

@NgModule({
  declarations: [MapComponent, ActivitiesMapComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(MAP_ROUTES),
    PageTitleDirective,
    LoadingSpinnerComponent,
    IconDirective
  ]
})
export class MapModule {}
