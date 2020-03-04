import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';
import { Observable } from 'rxjs';
import { StatusCandidate } from '../models/status-candidate';

@Injectable({
  providedIn: 'root'
})
export class StatusCandidateService {

  constructor(private httpClient: HttpClient) { }
  private basePath = '/api/v1/interview/status-candidate';
  statusCandidateSelected;

  getStatusCandidate(): Observable<Array<StatusCandidate>> {
    return this.httpClient.get<Array<StatusCandidate>>(environment.apiUrl + this.basePath);
  }

  getStatusCandidateSelected() {
    return this.statusCandidateSelected;
  }
}
