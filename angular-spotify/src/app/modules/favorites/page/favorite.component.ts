import { Component } from '@angular/core';
import data from '../../../data/track.json';
import { TrackModel } from '@core/models/track.model';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss'],
})
export class FavoriteComponent {
  dataTracks: TrackModel[] = data.data;
}
