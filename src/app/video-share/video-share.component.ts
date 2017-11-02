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
  // @Input() invitedRoom: string;
  connection: any;
  roomId: string;
  done: boolean = false;
  uid: string;
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
    let invitedRoom = this.roomstatService.getRoom();
    if (invitedRoom) {
      this.io.joinRoom(invitedRoom);
      this.roomId = invitedRoom;
    } else {
      this.roomId = this.uid;
      this.io.joinRoom(this.uid);
    }

    this.done = true;
    // let currentUrl = this.router.url;
    // if (currentUrl.slice(currentUrl.length -  4) === 'room') {
    //   this.router.createUrlTree(['/room', this.afAuth.auth.currentUser.uid])
    //   this.router.navigate(['/room', this.afAuth.auth.currentUser.uid])
    // }
  }

}
