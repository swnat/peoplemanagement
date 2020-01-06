import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Interview } from '../models/interview';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class InterviewService {
  private basePath: string="/api/v1/interview/";

  constructor(private httpClient: HttpClient){}

  addInterview(interview:Interview): Observable<Interview>{
    return this.httpClient.post<Interview>(environment.apiUrl+this.basePath,interview);

  }
  editInterview(interview:Interview): Observable<Interview>{
    return this.httpClient.put<Interview>(environment.apiUrl+this.basePath+interview.id,interview);
  }
  getInterview(id: number): Observable<Interview>{
    return this.httpClient.get<Interview>(environment.apiUrl+this.basePath+id);

  }
}
