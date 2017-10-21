import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

@Injectable()
export class RoomstatService {

  constructor(private http: Http) { }
  
  getRoomstat(room) {
    this.http.get('/rooms')
    .subscribe((data) => {
      console.log(data)
    }, (err) => {
      console.log(err)
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
