import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable()
export class SocketService {
  private host: string = /*window.location.protocol + '//' + window.location.hostname +*/ 'http://localhost:' + 4201;
  socket: any;
  socketIo: any;
  SERVER_URL: string = 'http://localhost:4201';
  private name: string
  constructor(){
    let URL = this.host //+ '/' + this.name;
    this.socketIo = io.connect(URL);
    console.log('checkign socketio from constructor: ', this.socketIo)
  }

  requestGuestList = (roomId) => {
    console.log('requesting new guest list')
    this.socketIo.emit('getGuestList', roomId);
  }

  sendMessage(roomId, chatInput, username) {
    this.socketIo.emit('chatMessage', roomId, chatInput, username);
  }

  stateChange(roomId, state, time, username) {
    this.socketIo.emit('changeState', roomId, state, time, username);
  }

  recieveMessages(): Observable<string[]> {
    return new Observable((observer)=>{
      this.socketIo.on('newMessage', (username, message) => {
        observer.next([username, message]);
      })
    })
  }

  recieveStateChange(): Observable<[string]> {
    return new Observable((observer) => {
      this.socketIo.on('newState', (state, time, username) =>{
        observer.next([state, time, username]);
      });
    });
  }

  displayUser(roomId, username) {
    this.socketIo.emit('addUser', roomId, username);
  }

  newUser(): Observable<any> {
    return new Observable((observer)=>{
      this.socketIo.on('newUser', (username) => {
        observer.next(username);
      })

    })
  }

  requestResponse(): Observable<[string]> {
    return new Observable((observer) => {
      this.socketIo.on('pauseResponse', (username) => {
        console.log('recieved pause req')
        observer.next(['pause', username]);
      });
      this.socketIo.on('playResponse', (username) => {
        console.log('recieved play req')
        observer.next(['play', username]);
      });
      this.socketIo.on('skipToResponse', (username, time) =>{
        observer.next([username, time]);
      });
    });
  }

  joinRoom(roomId) {
    this.socketIo.emit('joinRoom', roomId)
  }

  recieveGuestList(): Observable<string[]> {
    console.log('getting new list...')
    return new Observable((observer) => {
      this.socketIo.on('sendGuestList', (list) =>{
      observer.next(list);
      });
    });
  }

  signalTest() {
    this.socketIo.on('signal',(data) => {
      console.log(data)
    })
  }

  
  pauseRequest(roomId, username) {
    this.socketIo.emit('pauseRequest', roomId, username)
  }

  playRequest(roomId, username) {
    this.socketIo.emit('playRequest', roomId, username);
  }

  skipToRequest(roomId, username, time) {
    this.socketIo.emit('skipToRequest', roomId, username, time);
  }

  leftRoom(roomId, username) {
    this.socketIo.emit('leftRoom', roomId, username)
  }

  removeUser(): Observable<string> {
    return new Observable((observer) => {
      this.socketIo.on('removeUser', (username) => {
        observer.next(username)
      })
    })
  }

  onConnect(): Observable<any> {
    console.log('connecting...')
    return new Observable(observer => {
      this.socketIo.on('connect', (data) => {
        console.log('here is the data', data)
        observer.next();
      })
    })
  } 

  onDisconnect(): Observable<any> {
    return new Observable(observer => {
      this.socketIo.on('disconnect', () => {
        observer.next();
      })
    })
  }

}