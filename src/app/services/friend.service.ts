import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

@Injectable()
export class FriendService {

  constructor(private http: Http) { }

  getFriend(friend) {
    this.http.get('/friends')
    .subscribe((data) => {
      console.log(data)
    }, (err) => {
      console.log(err)
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
