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

  addFriend(friend) {
    this.http.post('/friends', {
      userId: friend.userId,
      friendId: friend.friendID
    })
  }

  deleteMessage(friend) {
    this.http.delete(`/friends/${friend.id}`)
  }
}
