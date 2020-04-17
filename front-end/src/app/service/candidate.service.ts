import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Candidate } from '../models/candidate';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ResponseList } from '../models/responseList';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  constructor(private httpClient: HttpClient) {}
  private basePath = '/api/v1/candidates/';
  candidateSelected;

  getCandidate(id: number) {
    return this.httpClient.get<Candidate>(environment.apiUrl + this.basePath + id);
  }

  addCandidate(formCandidate: FormData) {
    return this.httpClient.post<Candidate>(environment.apiUrl + this.basePath, formCandidate);
  }

  editCandidate(formCandidate: FormData, candidateid: number): Observable<Candidate> {
    return this.httpClient.put<Candidate>(environment.apiUrl + this.basePath + candidateid, formCandidate);
  }

  getAllCandidates(nameCandidate:string, page:number, itemsPerPage: number, sortBy: string): Observable<ResponseList> {
    let params = new HttpParams();
    if(nameCandidate) {
      params = params.append('filter', nameCandidate); 
    }

    params = params.append('size', itemsPerPage.toString()); 
    params = params.append('page', page.toString());
    params = params.append('sortby', sortBy);
    return this.httpClient.get<ResponseList>(environment.apiUrl + this.basePath, {params});
  }
  
  getCandidateSelected() {
    return this.candidateSelected;
  }

  deleteCandidate(candidateId: number ): Observable<string> {
    return this.httpClient.delete(environment.apiUrl + this.basePath + candidateId, {responseType: 'text'});
  }
}
