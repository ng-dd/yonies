import { Injectable } from '@angular/core';
import { Response, Headers, Http } from '@angular/http';

@Injectable()
export class LoginService {
  //path to the postgres db
  private users: '/users'
  
  constructor(private http: Http, ) { }

}
