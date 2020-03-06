import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {Record} from '../models/record';
import {environment} from '../../environments/environment';
import { Observable } from 'rxjs';
import { ResponseList } from '../models/responseList';

@Injectable({
  providedIn: 'root'
})
export class RecordService {
  private basePath = '/api/v1/record/';

  constructor(private httpClient: HttpClient) {}

  getAllRecord(page: number, itemsPerPage: number): Observable<ResponseList> {
    let params = new HttpParams();
    params = params.append('size', itemsPerPage.toString());
    params = params.append('page', page.toString());
    return this.httpClient.get<ResponseList>(environment.apiUrl + this.basePath, {params});
  }
}
