import { Component, OnInit, AfterViewInit, Input, OnChanges, SimpleChanges, HostListener } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { ScriptService } from '../services/script.service';
import * as SimplePeer from 'simple-peer'; //webrtc 
import { AngularFireAuth } from 'angularfire2/auth';
import { RoomstatService } from '../services/roomstat.service';
import { UserService } from '../services/user.service';
import { SocketService } from '../services/socket.service';
// import * as YT from 'youtube';


@Component({
  selector: 'app-stream-view',
  templateUrl: './stream-view.component.html',
  styleUrls: ['./stream-view.component.css']
})
export class StreamViewComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() videoId: string;
  @Input() roomId: string;
  @HostListener('window:unload', ['event'])
  incoming: string;
  host: any;
  p: any;
  n: any = navigator;
  player: any;
  targetPeer: any;
  // videoId: string = 'M7lc1UVf-VE';
  done: boolean = false;
  videoUrl: SafeResourceUrl;
  peerId: string;
  iframeElem: HTMLElement;
  guestList: object = [];
  counter: number = 0;
  room: object;
  user: number = Math.random()*10
  messages: object[] = [];
  io: any;
  constructor(
    private sanitizer: DomSanitizer,
    private script: ScriptService,
    private afAuth: AngularFireAuth,
    private roomstatService: RoomstatService,
    private socketService: SocketService,
  ) {
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/faG5mmkDbyc');
    this.script.load('youtube')
      .then((data) => { console.log('Script loaded: ', data, window) })
      .catch((err) => { console.log(err) });
  }

  ngAfterViewInit() {
    // const doc = (<any>window).document;
    // let playerApiScript = doc.createElement('script');
    // playerApiScript.type = 'text/javascript';
    // playerApiScript.src = 'https://www.youtube.com/iframe_api';
    // doc.body.appendChild(playerApiScript);
  }

  ngOnInit() {
    this.videoId = this.roomstatService.getVideo();
    this.ioInit();
  //   console.log('room id from inside stream-view componen>>>>>>', this.roomId)
  //   this.p = new SimplePeer({ initiator: location.hash === '#1', trickle: false });
  //   // this.peerId = this.p._id;
  //   console.log(this.room)
  //   this.roomstatService.getRoomstat(this.roomId, (data)=>{
  //     console.log('DATA!!>>>>>>', data['_body'])
  //     let parsed = JSON.parse(data['_body'])
  //     this.room = parsed[0]
  //     console.log('CHECKING ROOM AT!!!!!!!!!', this.room['peer_id'])
  //     this.host = this.room['peer_id'];

  //     this.p.on('signal', (data) => {
  //       if(!this.room['peer_id']){
  //         this.host = data;
  //         console.log('updating peer id w/: ', JSON.stringify(data));
  //         this.roomstatService.updateRoomstat(this.roomId, {
  //           peer_id: JSON.stringify(data)
  //         })
  //       }
  //       console.log('creating signal.....');
  //       console.log('SIGNAL', JSON.stringify(data));
  //       this.targetPeer = JSON.stringify(data);
  //     });
  //     console.log(this.room)
  //     console.log('get room data: ', this.room)
  //     console.log('Room info: ', this.room, 'with host: ', this.host)

  //  //replace with variable upon generating/joining room 
  //     // .subscribe((data) => {
  //     // })
  //     // .unsubscribe(( ) => {
  //       // if (roomInfo.hasOwnProperty('host_id')) {
  //       //   // this.roomstatService.addRoomstat({
    
  //       //   //   hostId: this.p._id,
  //       //   // })
  //       //   this.host = this.peerId;
  //       // } else {
  //       //   this.host = roomInfo['host_id'];
  //       // }
  //     // })

  //   console.log('oniniting')
  //   // if (!this.host) { //set host UID uncomment when auth is established on page
  //   //   // this.host = this.afAuth.auth.currentUser.uid
  //   // } else {
  //   //   this.peerId = String(this.counter);
  //   //   this.counter++
  //   // }
  //   console.log('initial peer information: ', this.p)
  //   // this.p.on('error', (err) => { console.log('error', err) });
    
  //   // this.p.signal(this.host);
    

  //   // document.querySelector('form').addEventListener('submit', function (ev) {
  //   //   ev.preventDefault();
  //   //   this.p.signal(JSON.parse(this.incoming));
  //   // });
  //   // this.roomstatService.getHostId(this.room)
  //   console.log('target peer i guess', this.targetPeer)
  //   this.p.signal(this.targetPeer); //connect to host via get
  //   this.p.on('connect', function () {
  //     console.log('CONNECT');
  //     this.p.send(this.videoUrl);
  //   });
  //   this.p.on('data', function (data) {
  //     console.log('data: ' + data);
  //   });
    
    (<any>window).onYouTubeIframeAPIReady = () => {
      this.player = new window['YT'].Player('player', {
        height: '390',
        width: '640',
        videoId: this.videoId,
        playerVars: { 'autoplay': 1, 'controls': 1 },
        events: {
          'onReady': onPlayerReady,
          'onStateChange': this.onPlayerStateChange
        }
      });
      
      
      console.log('finished initing')
    }
    
    function onPlayerReady(event) {
      console.log('Player loaded: ', this.player)
      event.target.playVideo();
    }
    console.log('checking host before close', this.host)
    // this.p.signal(JSON.parse(this.host));
    
    this.p.on('close', ()=>{  
      this.roomstatService.updateRoomstat(this.roomId, {
      room_info: 'closed',
    })
    // })
  })
  }
  
  ngOnChanges(changes: SimpleChanges) {
    if (this.player) {
      this.player.loadVideoById(this.videoId)
    }
  }

  ioInit() {
    // this.socketService.socketInit();
    // console.log('init the socket')
    // this.io = this.socketService.onMessage()
    // .subscribe((message)=>{
    //   this.messages.push(message);
    // })
    // this.socketService.onConnect()
    // .subscribe(() => {
    //   console.log('Connecting...')
    // })
    // this.socketService.onDisconnect()
    // .subscribe(() => {
    //   console.log('Disconnecting...')
    // })
    // this.socketService.send('test from '+ this.user)
  }

  

  onPlayerStateChange = (event) => {
    this.iframeElem = document.getElementById('player');
    console.log('PLAYER INFO!!!!: ', this.player)
    // this.player.loadVideoByUrl('https://player.twitch.tv/?channel=masgamerstv')
    console.log(this.iframeElem);
    if (this.host) {
      // this.player.playerVars.controls = 0;
      this.iframeElem.setAttribute('style', 'pointer-events: none;')
    } else {
      console.log('Player state changed: ', this.player.getPlayerState(), this.player.getCurrentTime())
      console.log(this.player)
      let state = this.player.getPlayerState();
      if (state === 1) {
        //socket over play request
      } else if (state === 2 && this.host !== this.peerId) {
        //socket over pause request to peers
      } else if (state === 3) {
        //Buffering- means socket over seekto request to peers /or/ video change
      } else if (state === 5) {
        //Video cued up, socket over queue
      }
    }

    if (event.data == window['YT'].PlayerState.PLAYING && !this.done) {
      setTimeout(this.stopVideo, 6000);
      this.done = true;
    }
    this.player.getPlayerState()
  }
  stopVideo = () => {
    this.player.stopVideo();
  }


  // unloadHandler(event){
  //   this.roomstatService.updateRoomstat(this.roomId, {
  //     peer_id: 'closed',
  //   })
  // }
}
