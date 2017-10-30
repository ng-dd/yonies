import { Injectable } from '@angular/core';
import * as SocketIo from 'socket.io';
import { Observable } from 'rxjs';

@Injectable()
export class SocketService {
  socket: any;
  SERVER_URL: string = 'http://localhost.com:4201';
  constructor(private socketIo: SocketIo){

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

  // onConnect(): Observable<any> {
  //   return new Observable(observer => {
  //     this.socket.on('connect', () => {
  //       observer.next();
  //     })
  //   })
  // } 

  // onDisconnect(): Observable<any> {
  //   return new Observable(observer => {
  //     this.socket.on('disconnect', () => {
  //       observer.next();
  //     })
  //   })
  // }

}