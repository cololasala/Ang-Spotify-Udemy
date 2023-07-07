import { Component, Input } from '@angular/core';
import { TrackModel } from '@core/models/track.model';
import { MultimediaService } from '@shared/services/multimedia/multimedia.service';

@Component({
  selector: 'app-card-player',
  templateUrl: './card-player.component.html',
  styleUrls: ['./card-player.component.scss'],
})
export class CardPlayerComponent {
  @Input() mode: 'small' | 'big' = 'big';
  @Input() track: TrackModel | undefined;
  constructor(private multimediaService: MultimediaService) {}

  sendTrack(track: any) {
    //  this.multimediaService.callBack.emit(track); si lo pasamos asi
    this.multimediaService.trackInfo$.next(track);
  }
}
