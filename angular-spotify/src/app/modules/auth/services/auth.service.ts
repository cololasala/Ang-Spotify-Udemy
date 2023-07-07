import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly urlApi = environment.apiUrl;

  constructor(private http: HttpClient, private cookieService?: CookieService) {}

  sendCredentials(email: string, password: string): Observable<any> {
    const body = {
      email,
      password,
    };
    return this.http.post(`${this.urlApi}/auth/login`, body).pipe(
      tap((dataOk: any) => {
        const { tokenSession, data } = dataOk;
        if(this.cookieService) { // se puso como opcional solo para hacer pruebas de test
          this.cookieService.set('token', tokenSession, 4, '/'); // seteo token en CookieService
        }
      })
    );
  }
}
