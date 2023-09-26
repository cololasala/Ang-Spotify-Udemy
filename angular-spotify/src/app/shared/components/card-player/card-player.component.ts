import { Component, Input, inject } from '@angular/core';
import { TrackModel } from '@core/models/track.model';
import { MultimediaService } from '@shared/services/multimedia/multimedia.service';

@Component({
  selector: 'app-card-player',
  templateUrl: './card-player.component.html',
  styleUrls: ['./card-player.component.scss'],
})
export class CardPlayerComponent {
  @Input({ required: true }) mode: 'small' | 'big' = 'big'; //Ang V16 uso de required
  @Input({ required: true }) track: TrackModel | undefined;

  multimediaService = inject(MultimediaService); //Ang V16 uso de inject para inyectar servicios

  sendTrack(track: any) {
    this.multimediaService.trackInfoSignal.set(track);
  }
}
