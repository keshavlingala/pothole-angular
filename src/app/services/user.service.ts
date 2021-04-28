import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { PotholeRecord, User } from '../models/models';
import { HttpClient } from '@angular/common/http';
import {
  APPLY_CONTRACTOR,
  MY_RECORDS,
  POTHOLE_UPLOAD,
} from '../models/contants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private auth: AuthService, private http: HttpClient) {}

  uploadPothole(record: PotholeRecord): Observable<PotholeRecord> {
    const formData = new FormData();
    formData.append('file', record.file);
    formData.append('lat', record.lat);
    formData.append('lng', record.lng);
    formData.append('description', record.description);
    formData.append('zipcode', record.zipcode);
    return this.http.post<PotholeRecord>(POTHOLE_UPLOAD, formData, {
      headers: this.auth.getHeaders(),
    });
  }

  getMyRecords(): Observable<PotholeRecord[]> {
    return this.http.get<PotholeRecord[]>(MY_RECORDS, {
      headers: this.auth.getHeaders(),
    });
  }

  applyContractor(licence: string): Observable<User> {
    return this.http.post<User>(
      APPLY_CONTRACTOR,
      { licence },
      {
        headers: this.auth.getHeaders(),
      }
    );
  }
}
