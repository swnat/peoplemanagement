import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private basePath: string="/api/v1/user/";
  constructor( private httpClient:HttpClient) {}
  getUser(id:number){
    return this.httpClient.get<User>(environment.apiUrl+this.basePath+id);
  }
}
