import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StatusChallenge } from '../models/status-challenge';

@Injectable({
  providedIn: 'root'
})
export class StatusChallengeService {
  private basePath: string = '/api/v1/challenge/status-challenge';
  constructor(private httpClient: HttpClient) { }

  getStatusChallenge(): Observable<Array<StatusChallenge>> {
    return this.httpClient.get<Array<StatusChallenge>>(environment.apiUrl+this.basePath);
  }

  getStatusChallengeSelected() {
    return this.statusChallengeSelected;
  }
  statusChallengeSelected;
}
