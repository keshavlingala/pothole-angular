import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LOGIN_URL, WHO_AM_I } from '../models/contants';
import { Observable } from 'rxjs';
import { AuthResponse, User } from '../models/models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private _token = '';

  get token(): boolean {
    return this._token !== '';
  }

  getHeaders(): any {
    return {
      Authorization: 'Bearer ' + this._token,
    };
  }

  login(username: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(LOGIN_URL, {
        username,
        password,
      })
      .pipe(
        map((res) => {
          this._token = res.jwt;
          return res;
        })
      );
  }

  whoami(): Observable<User> {
    return this.http.get<User>(WHO_AM_I, {
      headers: this.getHeaders(),
    });
  }
}
