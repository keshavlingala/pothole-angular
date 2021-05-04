import { Injectable } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Bid, Cluster } from '../../models/models';
import {
  APPLY_BID,
  CHECK_CONTRACT,
  MY_BIDS,
  MY_CONTRACTS,
  OPEN_CONTRACTS,
  UPDATE_STATUS,
} from '../../models/contants';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ContractorService {
  $clusters: Observable<Cluster[]>;

  constructor(private auth: AuthService, private http: HttpClient) {
    this.$clusters = this.http.get<Cluster[]>(OPEN_CONTRACTS, {
      headers: this.auth.getHeaders(),
    });
  }

  getOpenContracts(): Observable<Cluster[]> {
    return this.$clusters;
  }

  getContractById(zipcode: string | null): Observable<Cluster | undefined> {
    if (zipcode === null) {
      return of(undefined);
    }
    return this.$clusters.pipe(
      map((clusters) => {
        return clusters.find((cluster) => cluster.zipcode === zipcode);
      })
    );
  }

  getMyContracts(): Observable<Cluster[]> {
    return this.http.get<Cluster[]>(MY_CONTRACTS, {
      headers: this.auth.getHeaders(),
    });
  }

  postBid(
    bidAmount: string,
    description: string,
    zipcode: string
  ): Observable<Bid> {
    return this.http.post<Bid>(
      APPLY_BID + zipcode,
      {
        description,
        bidAmount,
      },
      { headers: this.auth.getHeaders() }
    );
  }

  checkBid(zipcode: string | null): Observable<Bid | undefined> {
    return this.http.get<Bid | undefined>(CHECK_CONTRACT + zipcode, {
      headers: this.auth.getHeaders(),
    });
  }

  getMyBids(): Observable<Bid[]> {
    return this.http.get<Bid[]>(MY_BIDS, {
      headers: this.auth.getHeaders(),
    });
  }

  updateStatus(contract: Cluster, val: string): Observable<Cluster> {
    // localhost:9898/api/contractor/contract/506112?status=UNASSIGNED
    return this.http.put<Cluster>(
      UPDATE_STATUS + contract.zipcode + '?status=' + val,
      {},
      {
        headers: this.auth.getHeaders(),
      }
    );
  }
}
