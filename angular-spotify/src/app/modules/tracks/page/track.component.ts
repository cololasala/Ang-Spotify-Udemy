import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/track.model';
import { TrackService } from '../services/track.service';
import { Subscription } from 'rxjs';
/* import * as data from '../../../data/track.json'; */

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss'],
})
export class TrackComponent implements OnInit, OnDestroy {
  dataTracks: TrackModel[] = [];
  dataRandomTracks: TrackModel[] = [];
  listObervers$: Subscription[] = [];

  constructor(private trackService: TrackService) {}

  ngOnInit(): void {
    /* ejemplo de uso tipos observables */
    /* const observerOne$ = this.trackService.dataTracksTrending$.subscribe({
      next: (data) => {
        this.dataTracks = data;
      },
      error: (err) => {
        console.log(err);
      },
    });

    const observerTwo$ = this.trackService.dataTracksRandom$.subscribe({
      next: (data) => {
        console.log(data);
        this.dataTracks = [...this.dataTracks, data]
      },
      error: (err) => {
        console.log(err);
      }
    })

    this.listObervers$ = [observerOne$, observerTwo$]; */
    this.getTracks();
    this.getRandomTracks();
  }

  getTracks(): void {
    this.trackService.getTracks().subscribe((data) => {
      this.dataTracks = data;
    });
  }

  getRandomTracks(): void {
    this.trackService.getRandomTracks().subscribe((data) => {
      this.dataRandomTracks = data;
    });
  }

  ngOnDestroy(): void {
    this.listObervers$.forEach((l) => l.unsubscribe());
  }
}
