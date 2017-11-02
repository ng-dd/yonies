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

  // Get items observable
  items(){
      this.socketIo.on('signal', (data) => {
      console.log(data);
    });
  }

  stateChange(roomId, state, time) {
    this.socketIo.emit('changeState', roomId, state, time);
  }

  recieveStateChange(): Observable<[string]> {
    return new Observable((observer) => {
      this.socketIo.on('newState', (state, time) =>{
        observer.next([state, time]);
      })
    })
  }

  requestResponse(): Observable<any> {
    return new Observable((observer) => {
      this.socketIo.on('pauseResponse')
    })
  }

  joinRoom(roomId) {
    this.socketIo.emit('joinRoom', roomId)
  }

  // Request initial list when connected
  list(): void {
    this.socket.emit('list');
  }

  signalTest() {
    this.socketIo.on('signal',(data) => {
      console.log(data)
    })
  }

  // Create signal
  create(params: any) {
    this.socket.emit('create', params);
  }

  // Remove signal
  remove(params: any) {
    this.socket.emit('remove', params);
  }
  
  pauseRequest(roomId) {
    this.socket.emit('pauseRequest', roomId)
  }

  playRequest(roomId) {
    this.socket.emit('playRequest'), roomId;
  }

  skipToRequest(roomId, time) {
    this.socket.emit('skipToRequest', roomId, time);
  }
  // socketInit() {
  //   this.socket = this.socketIo(this.SERVER_URL);
  // }

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