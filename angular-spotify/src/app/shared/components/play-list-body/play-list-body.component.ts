import { Component, Input } from '@angular/core';
import { TrackModel } from '@core/models/track.model';

@Component({
  selector: 'app-play-list-body',
  templateUrl: './play-list-body.component.html',
  styleUrls: ['./play-list-body.component.scss']
})
export class PlayListBodyComponent {
  @Input() tracks: TrackModel[] | null;
  sortOption: { property: string | null, order: string} = { property: null , order: 'ASC'};

  changeSort(option: string): void {
    this.sortOption = {
      property: option,
      order: this.sortOption.order === 'ASC' ? 'DESC' : 'ASC'
    }
  }
}
