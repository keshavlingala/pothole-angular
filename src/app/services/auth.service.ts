import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LOGIN_URL, REGISTER_URL, WHO_AM_I } from '../models/contants';
import { Observable, of } from 'rxjs';
import { AuthResponse, User } from '../models/models';
import { map, mapTo, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _token = '';
  private _user: User | null = null;

  constructor(private http: HttpClient, private router: Router) {
    this._token = localStorage.getItem('token') || '';
    if (this._token) {
      this.getUser().subscribe(
        (res) => {},
        (error) => {
          this.logout();
        }
      );
    }
  }

  get token(): string {
    return this._token;
  }

  get isLoggedIn(): boolean {
    return this._token !== '';
  }

  isContractor(): Observable<boolean> {
    return this.getUser().pipe(
      map((user) => {
        return !!user.authorities.find((a) => a.authority === 'CONTRACTOR')
          ?.authority;
      })
    );
  }

  isAdmin(): Observable<boolean> {
    return this.getUser().pipe(
      map((user) => {
        return !!user.authorities.find((a) => a.authority === 'ADMIN')
          ?.authority;
      })
    );
  }

  getUser(): Observable<User> {
    if (this._user) {
      of(this._user);
    }
    return this.whoami().pipe(
      map((user) => {
        this._user = user;
        return user;
      })
    );
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
          localStorage.setItem('token', res.jwt);
          return res;
        })
      );
  }

  logout(): void {
    localStorage.clear();
    this._token = '';
    this._user = null;
    this.router.navigateByUrl('/login');
  }

  whoami(): Observable<User> {
    return this.http.get<User>(WHO_AM_I, {
      headers: this.getHeaders(),
    });
  }

  register(
    username: string,
    password: string,
    email: string
  ): Observable<User> {
    return this.http.post<User>(REGISTER_URL, {
      username,
      password,
      email,
    });
  }
}
