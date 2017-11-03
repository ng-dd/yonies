import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth'
import { SocketService } from '../services/socket.service'
import { RoomstatService } from '../services/roomstat.service'

@Component({
  selector: 'app-video-share',
  templateUrl: './video-share.component.html',
  styleUrls: ['./video-share.component.css']
})
export class VideoShareComponent implements OnInit {
  @Input() nameList: string[];
  connection: any;
  roomId: string;
  done: boolean = false;
  uid: string;
  username: string;
  constructor(
    private afAuth: AngularFireAuth, 
    private router: Router, 
    private io: SocketService,
    private roomstatService: RoomstatService,
  ) {
  }
  
  ngOnInit() {
    this.io = new SocketService();
    // console.log('rendering videoshare component');
    this.uid = this.afAuth.auth.currentUser.uid
    this.username = this.afAuth.auth.currentUser.email
    let invitedRoom = this.roomstatService.getRoom();
    if (invitedRoom) {
      this.io.joinRoom(invitedRoom);
      this.roomId = invitedRoom;
    } else {
      this.roomId = this.uid;
      this.io.joinRoom(this.uid);
    }

    this.done = true;
  }

}
