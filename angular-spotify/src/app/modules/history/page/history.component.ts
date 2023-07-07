import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';
import { TrackModel } from '@core/models/track.model';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  dataTracks: Observable<TrackModel[]> = of([]); // inicializamos obsevable con array vacio
  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.searched("");
  }

  searched(e: string): void {
    this.dataTracks = this.searchService.getTracks(e);
  }
}
