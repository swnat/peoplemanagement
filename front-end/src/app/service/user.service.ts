import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private basePath = '/api/v1/user/';
  constructor(private httpClient: HttpClient) { }
  getUser(id: number) {
    return this.httpClient.get<User>(environment.apiUrl + this.basePath + id);
  }

  addUser(user: User): Observable<User> {
    return new Observable((observer) => {
      observer.error('Error2');
      user.idUser = 9999999;
      observer.next(user);
      observer.complete();
    });
  }

  editUser(user: User): Observable<User> {
    return new Observable((observer) => {
      observer.next(user);
      observer.complete();
    });
  }
}
