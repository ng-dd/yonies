import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

@Injectable()
export class MessageService {

  constructor(private http: Http) { }
  
  getMessage(message) {
    this.http.get('/messages')
    .subscribe((data) => {
      console.log(data)
    }, (err) => {
      console.log(err)
    })
  }

  addMessage(message) {
    this.http.post('http://localhost:4201/messages', {
      video_dm: message.video_dm,
      message_dm: message.message_dm,
      user_id: message.user_id,
      friend_id: message.friend_id
    })
  }

  deleteMessage(message) {
    this.http.delete(`/messages/${message.id}`)
  }
}
