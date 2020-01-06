import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Approval } from '../models/approval';
import { Observable } from 'rxjs';
import { Challenge } from '../models/challenge';
import { ChallengeForm } from '../models/challenge-form';
import { ChallengeWorkflow } from '../models/challenge-workflow';

@Injectable({
  providedIn: 'root'
})
export class ChallengeWorkflowService {
  private basePath: string = "/api/v1/challenge-workflow/"
  url: string;
  constructor(private httpClient: HttpClient) { }
  startProcess(challengeWF: ChallengeWorkflow): Observable<Challenge> {
    this.url = environment.apiUrl+this.basePath+'start-process/';
    return this.httpClient.post<Challenge>(this.url, challengeWF);
  }

  completeProcess(approval: Approval) : Observable<boolean>{
    this.url = environment.apiUrl+this.basePath+'complete-process/';
    return this.httpClient.post<boolean>(this.url, approval);
  }

  completeTaskWithForm(challengeForm: ChallengeForm) : Observable<void>{
    this.url = environment.apiUrl+this.basePath+'complete-task-form/';
    return this.httpClient.post<void>(this.url, challengeForm);
  }
}
