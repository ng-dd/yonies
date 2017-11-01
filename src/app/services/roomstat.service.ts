import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

@Injectable()
export class RoomstatService {
  roomId: string;
  selectedUrl: string;
  constructor(private http: Http) { }
  
  getRoomstat(room, cb) {
    this.http.get('http://localhost:4201/rooms/' + room )
    .subscribe((data) => {
      console.log('data from getRoomStat service: ', data)
      cb(data)
    })
    // , (err) => {
    //   console.log(err)
    // })
  }

  getHostId(room) {
    this.http.get('http://localhost:4201/rooms/' + room )
    .subscribe((data) => {
      console.log(JSON.parse(data['_body'])[0]['host_id'])
      return JSON.parse(data['_body'])[0]['host_id']
    })
  }

  addRoomstat(cb) {
    console.log('attempting to add a room', )
    this.http.post('http://localhost:4201/rooms', {
      // categoryId: room.categoryId,
      // count: room.count,
      // hostId: room.hostId,
      // duration: room.duration,
      // peer_id: String(room.peer_id)
    }).subscribe((data)=>{ 
      console.log('entered room>>>>>> ', data)
      cb(data)//['_body'].room_id
    })
    // .map((data) => {
    //   console.log('data from addRoomStat service: ', data)
    //   return data;
    // })
    // , (err) => {
    //   console.log(err)
    // })
  }

  updateRoomstat(room, info) {
    return this.http.put('http://localhost:4201/rooms/' + room, {
      room_info: String(info.peer_id)
    })
    .subscribe((data)=>{ return data })
  }

  deleteRoomstat(room) {
    this.http.delete(`/rooms/${room.roomId}`)
  }

  selectVideo(url) {
    this.selectedUrl = url;
  }

  getVideo() {
    return this.selectedUrl;
  }
}
