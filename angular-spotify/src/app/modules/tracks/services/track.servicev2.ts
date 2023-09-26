import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, map, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';

const apiUrl = environment.apiUrl;

export const getTracks = (): Observable<any> => { // Ang 16 uso de functional inyection 
  return inject(HttpClient)
    .get(`${apiUrl}/tracks`)
    .pipe(
      map(({ data }: any) => {
        return data;
      }),
      catchError((err) => {
        alert('Error al obtener las tracks error: ' + err.status);
        return of([]);
      })
    );
};
