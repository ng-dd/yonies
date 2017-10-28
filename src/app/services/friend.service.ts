import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

@Injectable()
export class FriendService {

  constructor(private http: Http) { }

  getFriend(userId): Observable<any> {
    return this.http.get(`http://localhost:4201/friends/${userId}`)
    .map((res) => {
      return res.json()
    })
  }

  addFriend(user, friend) {
    console.log('user-->', user, 'friend-->', String(friend))
    this.http.post('http://localhost:4201/friends', {
      user_id: user,
      friend_id: String(friend)
    })
  }

  deleteMessage(friend) {
    this.http.delete(`/friends/${friend.id}`)
  }
}
