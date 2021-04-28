import { Injectable } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import {
  APPROVE_CONTRACTOR,
  CONTRACTORS_APPLICATIONS,
} from '../../models/contants';
import { Observable, zip } from 'rxjs';
import { User } from '../../models/models';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private auth: AuthService, private http: HttpClient) {}

  getContractorApplications(): Observable<User[]> {
    return this.http.get<User[]>(CONTRACTORS_APPLICATIONS, {
      headers: this.auth.getHeaders(),
    });
  }

  approveContractors(users: string[]): Observable<User[]> {
    return zip(
      ...users.map((user) =>
        this.http.post<User>(
          APPROVE_CONTRACTOR + user,
          {},
          { headers: this.auth.getHeaders() }
        )
      ),
      (...res: User[]) => {
        return res;
      }
    );
  }
}
