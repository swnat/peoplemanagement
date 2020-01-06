import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../environments/environment";
import { Observable } from 'rxjs';
import { StatusCandidate } from '../models/status-candidate';

@Injectable({
  providedIn: 'root'
})
export class StatusCandidateService {
  private basePath: string = '/api/v1/interview/status-candidate';

  constructor(private httpClient: HttpClient) { }

  getStatusCandidate(): Observable<Array<StatusCandidate>> {
    return this.httpClient.get<Array<StatusCandidate>>(environment.apiUrl+this.basePath);
  }

  getStatusCandidateSelected() {
    return this.statusCandidateSelected;
  }
  statusCandidateSelected;
}
