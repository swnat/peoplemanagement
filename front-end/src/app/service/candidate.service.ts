import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {Candidate} from '../models/candidate';
import {environment} from "../../environments/environment";
import { Observable } from 'rxjs';
import { ResponseList } from '../models/responseList';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  private basePath: string="/api/v1/candidates/";

  constructor(private httpClient: HttpClient){}

  getCandidate(id: number) {
    return this.httpClient.get<Candidate>(environment.apiUrl+this.basePath+id);
  }

  addCandidate(candidate: Candidate, image: string) {
    candidate.profileImage = image;
    return this.httpClient.post<Candidate>(environment.apiUrl+this.basePath,candidate);
  }

  editCandidate(candidate:Candidate): Observable<Candidate>{
    return this.httpClient.put<Candidate>(environment.apiUrl+this.basePath+candidate.id, candidate);
  }

  getAllCandidates(nameCandidate:string, page:number,itemsPerPage: number): Observable<ResponseList> {
    let params=new HttpParams();
    if(nameCandidate) {
      params=params.append('filter', nameCandidate); 
    }

    params=params.append('size',itemsPerPage.toString()); 
    params=params.append('page',page.toString());
    return this.httpClient.get<ResponseList>(environment.apiUrl+this.basePath,{params});
  }
  getCandidateSelected() {
    return this.candidateSelected;
  }
  candidateSelected;
}
