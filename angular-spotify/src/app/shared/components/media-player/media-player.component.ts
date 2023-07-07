import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { TrackModel } from '@core/models/track.model';
import { TrackService } from '@modules/tracks/services/track.service';
import { MultimediaService } from '@shared/services/multimedia/multimedia.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.scss'],
})
export class MediaPlayerComponent implements OnInit, OnDestroy {
  @ViewChild('progressBar') progressBar: ElementRef = new ElementRef('');
  listObservers$: Subscription[] = [];
  state = 'pause'; // estado del boton de reproduccion
  tracks: TrackModel[] = [];
  actualTrack: TrackModel; // cancion actual en el reproductor
  mutedTrack = false;
  constructor(
    public multimediaService: MultimediaService,
    private trackService: TrackService
  ) {} // al hacerse public puedo usarlo en el template

  ngOnInit(): void {
    const newSubscription = this.multimediaService.trackInfo$.subscribe(
      (data: any) => {
        // console.log('recibiendo track en media player', data);
        this.actualTrack = data;
      }
    );

    const tracksSubscritption = this.trackService
      .getTracks()
      .subscribe((data) => {
        this.tracks = data;
      });

    const toogleStatusSubscription =
      this.multimediaService.playerStatus$.subscribe((data) => {
        this.state = data;
      });

    this.listObservers$ = [
      newSubscription,
      toogleStatusSubscription,
      tracksSubscritption,
    ];
  }

  handlePosition(e: MouseEvent): void {
    const elNative: HTMLElement = this.progressBar.nativeElement;
    const { clientX } = e; // coordenada x de click con el mouse
    const { x, width } = elNative.getBoundingClientRect(); // width ancho total de nuestra barra de progreso,
    // x seria nuestra coordenada inicial de nuestra barra (391px maso menos)
    const clickX = clientX - x; // obtengo posicion dentro de la barra restando su inicial de 391px
    const percentageFromX = (clickX * 100) / width; // el width seria nuestro 100% -> calculo el porcentaje del click dentro de la barra
    this.multimediaService.seekAudio(percentageFromX);
  }

  previusTrack(): void {
    const previusTrack = this.tracks.find(
      (t) => t._id === this.actualTrack._id - 1
    ); // buscamos la track anterior
    if (previusTrack) {
      this.multimediaService.trackInfo$.next(previusTrack);
    }
  }

  nextTrack(): void {
    const nextTrack = this.tracks.find(
      (t) => t._id === this.actualTrack._id + 1
    ); // buscamos la track siguiente
    if (nextTrack) {
      this.multimediaService.trackInfo$.next(nextTrack);
    }
  }

  changeVolume(): void {
    this.mutedTrack = !this.mutedTrack;
    this.multimediaService.setMuted(this.mutedTrack);
  }

  ngOnDestroy(): void {
    this.listObservers$.forEach((l) => l.unsubscribe());
  }
}
