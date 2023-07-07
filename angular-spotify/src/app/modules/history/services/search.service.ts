import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getTracks(search: string): Observable<any> {
    let params = new HttpParams();
    if (search) {
      params = params.append('src', search);
    }
    return this.http.get(`${this.apiUrl}/tracks`, { params: params }).pipe(
      map((data: any) => {
        return data.data;
      })
    );
  }
}
