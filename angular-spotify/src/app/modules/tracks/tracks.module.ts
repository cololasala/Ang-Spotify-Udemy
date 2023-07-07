import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TracksRoutingModule } from './tracks-routing.module';
import { TrackComponent } from './page/track.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    TrackComponent
  ],
  imports: [
    CommonModule,
    TracksRoutingModule,
    SharedModule
  ],
})
export class TracksModule { }
