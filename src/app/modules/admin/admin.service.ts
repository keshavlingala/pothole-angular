import { Injectable } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import {
  ALL_BIDS,
  ALL_CONTRACTS,
  ALL_USERS,
  APPROVE_BID,
  APPROVE_CONTRACTOR,
  CONTRACTORS_APPLICATIONS,
  GET_USER_INFO,
} from '../../models/contants';
import { Observable, of, zip } from 'rxjs';
import { Bid, Cluster, User } from '../../models/models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  $clusters: Observable<Cluster[]>;

  constructor(private auth: AuthService, private http: HttpClient) {
    this.$clusters = this.http.get<Cluster[]>(ALL_CONTRACTS, {
      headers: this.auth.getHeaders(),
    });
  }

  getClusterFromId(clusterId: string): Observable<Cluster | undefined> {
    return this.$clusters.pipe(
      map((clusters) => {
        return clusters.find((cluster) => cluster.zipcode === clusterId);
      })
    );
  }

  getContractorFromId(id: string): Observable<User> {
    return this.http.get<User>(GET_USER_INFO + id, {
      headers: this.auth.getHeaders(),
    });
  }

  getContractorApplications(): Observable<User[]> {
    return this.http.get<User[]>(CONTRACTORS_APPLICATIONS, {
      headers: this.auth.getHeaders(),
    });
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(ALL_USERS, {
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

  getAllBids(): Observable<Bid[]> {
    return this.http.get<Bid[]>(ALL_BIDS, {
      headers: this.auth.getHeaders(),
    });
  }

  approveBid(bidId: string | undefined): Observable<Bid | null> {
    if (!bidId) {
      return of(null);
    }
    return this.http.post<Bid>(
      APPROVE_BID + bidId,
      {},
      {
        headers: this.auth.getHeaders(),
      }
    );
  }
}
