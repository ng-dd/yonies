import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

@Injectable()
export class RoomstatService {
  roomId: string;
  selectedUrl: string;
  player: any;
  constructor(private http: Http) { }
  
  getRoomstat(room, cb) {
    this.http.get('http://localhost:4201/rooms/' + room )
    .subscribe((data) => {
      console.log('data from getRoomStat service: ', data)
      cb(data)
    })

  }

  getRoom() {
    return this.roomId;
  }

  setRoom(room) {
    console.log('setting room to: '+ room, typeof(room));
    this.roomId = room;
    console.log('roomId successfully changed')
  }

  getHostId(room) {
    this.http.get('http://localhost:4201/rooms/' + room )
    .subscribe((data) => {
      console.log(JSON.parse(data['_body'])[0]['host_id'])
      return JSON.parse(data['_body'])[0]['host_id']
    })
  }

  getHostRoom(host): Observable<any> {
    return new Observable((observer)=>{
      console.log('what the hell is coming through? ', host)
      this.http.get('http://localhost:4201/rooms/' + host)
      .subscribe((data) =>{
        console.log('weve broken through with: ' + data)
        observer.next(data.json());
      })
    })
  }

  addRoomstat(input): Observable<any> {
    return new Observable((observer)=>{
      console.log('attempting to add a room', input)
      this.http.post('http://localhost:4201/rooms', {
        // categoryId: room.categoryId,
        // count: room.count,
        host_id: input.host_id,
        video_url: input.video_url
        // duration: room.duration,
        // peer_id: String(room.peer_id)
      })
      .subscribe((data)=>{ 
        console.log('entered room>>>>>> ', data)
        observer.next(data.json())
      })

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

  // deleteRoomstat(room) {
  //   this.http.delete(`/rooms/${room.roomId}`)
  // }

  selectVideo(url) {
    console.log('selecting video! ', url)
    this.selectedUrl = url;
  }

  getSelectedVideo() {
    return this.selectedUrl;
  }

  setVideo(room, url) {
    this.http.put('http://localhost:4201/rooms/' + room, {
      video_url: url
    })
  }

  setPlayer(player) {
    this.player = player
  }

  skipTo(time) {
    this.player.seekTo(time);
  }

  playVideo() {
    this.player.playVideo();
  }

  pauseVideo() {
    this.player.pauseVideo();
  }

  getVideo(room): Observable<any> {
    return new Observable((observer) => {
      console.log('room from inside observable: ',room)

      this.http.get('http://localhost:4201/rooms/' + room)
      .subscribe((data) => {
        if (data) {
          console.log('getting data from getvideo', data.json());
          observer.next(data.json());
        } else {
          observer.next(false);
        }
      })
    })
  }
}
