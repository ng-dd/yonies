import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable()
export class SocketService {
  private host: string = /*window.location.protocol + '//' + window.location.hostname +*/ 'http://localhost:' + 4201;
  socket: any;
  socketIo: any;
  SERVER_URL: string = 'http://localhost:4201';

  constructor(private name: string){
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
  // socketInit() {
  //   this.socket = this.socketIo(this.SERVER_URL);
  // }

  // send(message: any) {
  //   this.socket.emit('message', message);
  // }

  // onMessage(): Observable<any> {
  //   return new Observable(observer => {
  //     this.socket.on('message', (data) => {
  //       observer.next(data);
  //     })
  //   })
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