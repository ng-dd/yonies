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
    this.http.post('/messages', {
      videoDm: message.videoDm,
      message: message.message,
      userId: message.userId,
      friendId: message.friendId
    })
  }

  deleteMessage(message) {
    this.http.delete(`/messages/${message.id}`)
  }
}
