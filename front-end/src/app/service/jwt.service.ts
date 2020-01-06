import { Injectable } from '@angular/core';
import * as jwt from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  constructor() { }

  decode(token: string){
    return jwt(token);
  }
}
