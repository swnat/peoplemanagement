import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';
import { InterviewWorkflow } from '../models/interview-workflow';
import { Approval } from '../models/approval';
import { InterviewForm } from '../models/interview-form';
import { Interview } from '../models/interview';

@Injectable({
  providedIn: 'root'
})
export class InterviewWorkflowService {
  private basePath = '/api/v1/interview-workflow/';
  url: string;

  constructor(private httpClient: HttpClient) {}

  startProcess(interviewWF: InterviewWorkflow): Observable<Interview> {
    this.url = environment.apiUrl + this.basePath + 'start-process/';
    return this.httpClient.post<Interview>(this.url, interviewWF);
  }

  completeProcess(approval: Approval): Observable<boolean> {
    this.url = environment.apiUrl + this.basePath + 'complete-process/';
    return this.httpClient.post<boolean>(this.url, approval);
  }

  completeTaskWithForm(interviewForm: InterviewForm): Observable<void> {
    this.url = environment.apiUrl + this.basePath + 'complete-task-form/';
    return this.httpClient.post<void>(this.url, interviewForm);
  }
}
