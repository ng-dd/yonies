import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable()
export class SocketService {
  private host: string = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port;
  socket: any;
  socketIo: any;
  SERVER_URL: string = 'http://localhost.com:4201';

  constructor(private name: string){
    let URL = this.host + '/' + this.name;
    this.socketIo = io.connect(URL);
  }

  // Get items observable
  items(): Observable<any> {
    return Observable.create(observer => {
      this.socket.on('item', (item: any) => observer.next(item));
    });
  }

  // Request initial list when connected
  list(): void {
    this.socket.emit('list');
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
      this.socket.on('connect', () => {
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