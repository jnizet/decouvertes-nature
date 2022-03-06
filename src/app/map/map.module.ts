import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';
import { ActivitiesMapComponent } from './activities-map/activities-map.component';
import { RouterModule } from '@angular/router';
import { MAP_ROUTES } from './map.routes';
import { IconModule } from '../icon/icon.module';
import { PageTitleModule } from '../page-title/page-title.module';
import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';

@NgModule({
  declarations: [MapComponent, ActivitiesMapComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(MAP_ROUTES),
    IconModule,
    PageTitleModule,
    LoadingSpinnerModule
  ]
})
export class MapModule {}
