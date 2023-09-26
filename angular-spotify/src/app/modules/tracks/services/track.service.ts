import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TrackModel } from '@core/models/track.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, map, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TrackService {
  apiUrl = environment.apiUrl;

  //  dataTracksTrending$: Observable<TrackModel[]> = of([]); // metodo de creacion de observables
  //  dataTracksRandom$: Observable<any> = new Observable<any>(); // otra manera de creacion de observables

  constructor(private http: HttpClient) {
    //   const { data }: any = (DataRaw as any).default; // saco la data desde DataRaw
    //  this.dataTracksTrending$ = of(data); // guardo la data en el observable
    /*   this.dataTracksRandom$ = new Observable((observer) => {
      const newRandom = {
        _id: 9,
        name: 'prueba',
        album: 'album 1',
        url: '',
        cover: '',
      };

      setTimeout(() => {
        observer.next(newRandom);
      }, 3000);
    }); */
  }

  getTracks(): Observable<any> {
    return this.http.get(`${this.apiUrl}/tracks`).pipe(
      map(({ data }: any) => {
        return data;
      }),
      catchError((err) => {
        alert('Error al obtener las tracks error: ' + err.status);
        return of([]);
      })
    );
  }
  
    /* Retorna lista de tracks menos la primera */
    getRandomTracks(): Observable<any> {
    return this.http.get(`${this.apiUrl}/tracks`).pipe(
        mergeMap(({ data }: any) => {       // mergeMap permite multiples subscripciones al mismo tiempo
          return this.getSkipById(data, 1);
        }),
      );
    }

  /*Promise retorna tracks distintas al id pasado por argumento */
  getSkipById(tracks: TrackModel[], id: number): Promise<TrackModel[]> {
    return new Promise((resolve, reject) => {
      const listTemp = tracks.filter((t) => t._id !== id);
      resolve(listTemp);
    });
  }
}
