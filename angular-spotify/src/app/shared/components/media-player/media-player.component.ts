import {
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  effect,
  inject,
} from '@angular/core';
import { TrackModel } from '@core/models/track.model';
import { TrackService } from '@modules/tracks/services/track.service';
import { getTracks } from '@modules/tracks/services/track.servicev2';
import { MultimediaService } from '@shared/services/multimedia/multimedia.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.scss'],
})
export class MediaPlayerComponent implements OnDestroy {
  @ViewChild('progressBar') progressBar: ElementRef = new ElementRef('');
  listObservers$: Subscription[] = [];
  state = 'pause'; // estado del boton de reproduccion
  tracks: TrackModel[] = [];
  actualTrack: TrackModel; // cancion actual en el reproductor
  mutedTrack = false;
  multimediaService = inject(MultimediaService);
  trackService = inject(TrackService);

  constructor() {
    effect(() => { //Ang 16, el effect sirve para escuchar cambios de un signal 
      const data = this.multimediaService.trackInfoSignal();
      if (data) this.actualTrack = data;
    });
    
    getTracks().subscribe((data) => { //uso de funcion que inyecta HttpClient
      console.log('Tracks desde trackservice v2');
      this.tracks = data;
    });

    effect(() => {
      const status = this.multimediaService.playerStatusSignal();
      if (status) this.state = status;
    });

    /*
    this.listObservers$ = [
      newSubscription,
      toogleStatusSubscription,
      tracksSubscritption,
    ]; */
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
      this.multimediaService.trackInfoSignal.set(previusTrack);
    }
  }

  nextTrack(): void {
    const nextTrack = this.tracks.find(
      (t) => t._id === this.actualTrack._id + 1
    ); // buscamos la track siguiente
    if (nextTrack) {
      this.multimediaService.trackInfoSignal.set(nextTrack);
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
