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


  stateChange(roomId, state, time) {
    this.socketIo.emit('changeState', roomId, state, time);
  }

  recieveStateChange(): Observable<[string]> {
    return new Observable((observer) => {
      this.socketIo.on('newState', (state, time) =>{
        observer.next([state, time]);
      });
    });
  }

  requestResponse(): Observable<string> {
    return new Observable((observer) => {
      this.socketIo.on('pauseResponse', () => {
        observer.next('pause');
      });
      this.socketIo.on('playResponse', () => {
        observer.next('play');
      });
      this.socketIo.on('skipToResponse', (time) =>{
        observer.next(time);
      });
    });
  }

  joinRoom(roomId) {
    this.socketIo.emit('joinRoom', roomId)
  }

  signalTest() {
    this.socketIo.on('signal',(data) => {
      console.log(data)
    })
  }

  
  pauseRequest(roomId) {
    this.socketIo.emit('pauseRequest', roomId)
  }

  playRequest(roomId) {
    this.socketIo.emit('playRequest', roomId);
  }

  skipToRequest(roomId, time) {
    this.socketIo.emit('skipToRequest', roomId, time);
  }

  onConnect(): Observable<any> {
    return new Observable(observer => {
      console.log('connecting...')
      this.socket.on('connect', (data) => {
        console.log('here is the data', data)
        observer.next();
      })
    })
  } 

  onDisconnect(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('disconnect', () => {
        observer.next();
      })
    })
  }

}