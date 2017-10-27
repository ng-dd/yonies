import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

@Injectable()
export class UserService {

  constructor(private http: Http) { }
  
  getUser(user) { 
    this.http.get(`http://localhost:4201/users/${user.username}`)
    .subscribe((data) => {
      console.log(data.json(), '<-- THIS IS DATA')
      return data.json;

      
    }, (err) => {
      console.log('nahhh', err)
    })
  }

  getUserTest(user) { 
    return this.http.get(`http://localhost:4201/users/${user.username}`)
  }

  addUser(user) {
    this.http.post('http://localhost:4201/users', {
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      adminstatus: user.adminstatus,
      age: user.age,
      gender: user.gender,
      address: user.address,
      city: user.city,
      state: user.state,
      zipcode: user.zipcode,
      email: user.email,
      phone: user.phone
    })
    .subscribe((data) => {
      console.log('added user to db', data)
    }, (err) => {
      console.log(err)
    })
  }

  deleteUser(user) {
    this.http.delete(`/users/${user.id}`)
  }
}
