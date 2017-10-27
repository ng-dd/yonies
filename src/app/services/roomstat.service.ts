import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

@Injectable()
export class RoomstatService {

  constructor(private http: Http) { }
  
  getRoomstat(room): Observable<any> {
    return this.http.get('http://localhost:4201/rooms/' + room )
    .map((data) => {
      console.log(data)
      return data
    }, (err) => {
      console.log(err)
    })
  }

  getHostId(room) {
    this.http.get('http://localhost:4201/rooms/' + room )
    .subscribe((data) => {
      console.log(JSON.parse(data['_body'])[0]['host_id'])
      return JSON.parse(data['_body'])[0]['host_id']
    })
  }

  addRoomstat(room) {
    this.http.post('/rooms', {
      categoryId: room.categoryId,
      roomId: room.roomId,
      count: room.count,
      hostId: room.hostId,
      duration: room.duration
    })
    .subscribe((data) => {
      console.log(data)
    }, (err) => {
      console.log(err)
    })
  }

  deleteRoomstat(room) {
    this.http.delete(`/rooms/${room.roomId}`)
  }
}
