import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

@Injectable()
export class UserService {

  constructor(private http: Http) { }
  
  getUser(user) {
    this.http.get(`/users/${user.id}`)
    .subscribe((data) => {
      console.log(data)
    }, (err) => {
      console.log(err)
    })
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
