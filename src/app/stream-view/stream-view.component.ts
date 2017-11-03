import { Component, OnInit, AfterViewInit, Input, OnChanges, SimpleChanges, HostListener } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { ScriptService } from '../services/script.service';
import * as SimplePeer from 'simple-peer'; //webrtc 
import { AngularFireAuth } from 'angularfire2/auth';
import { RoomstatService } from '../services/roomstat.service';
import { UserService } from '../services/user.service';
import { SocketService } from '../services/socket.service';
import { PostService } from '../services/post.service';
// import * as YT from 'youtube';


@Component({
  selector: 'app-stream-view',
  templateUrl: './stream-view.component.html',
  styleUrls: ['./stream-view.component.css']
})
export class StreamViewComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() videoId: string;
  @Input() roomId: string;
  @Input() private socketService: SocketService;
  @Input() uid: string;
  @Input() username: string
  @HostListener('window:unload', ['event'])
  incoming: string;
  host: any;
  p: any;
  n: any = navigator;
  player: any;
  targetPeer: any;
  isHost: boolean;
  done: boolean = false;
  videoUrl: SafeResourceUrl;
  peerId: string;
  iframeElem: HTMLElement;
  guestList: string[] = [];
  counter: number = 0;
  room: object;
  user: number = Math.random()*10
  messages: object[] = [];
  io: any;
  connection: any;
  observeStateChange: any;
  requestResponse: any;
  time: string = '';
  rendered: boolean = false;
  checkList: any;
  nameList: string[] = [];

  constructor(
    private sanitizer: DomSanitizer,
    private script: ScriptService,
    private afAuth: AngularFireAuth,
    private roomstatService: RoomstatService,
    private postService: PostService,
  ) {
    // this.socketService = new SocketService('room');
    console.log('looking at the instance: ', this.socketService)
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/faG5mmkDbyc');
    this.script.load('youtube')
      .then((data) => { console.log('Script loaded: ', data, window) })
      .catch((err) => { console.log(err) });
  }

  ngAfterViewInit() {

  }

  getUpdate(evt) {
    if (this.isHost){
      if (evt === 'pause') {
        this.player.pauseVideo();
      } else if (evt === 'play') {
        this.player.playVideo();
      } else {
        this.player.seekTo(evt)
      }
    }
  }

  ngOnInit() {
    this.isHost = this.roomId === this.uid;

    console.log('Here is initial roomId: ', this.roomId, ' Here In initial video', this.videoId, 'with selected video as: ', this.roomstatService.getSelectedVideo())
    this.videoId = this.roomstatService.getSelectedVideo()
    // if (!this.roomId){
    //   this.roomId = '1'
    // }
    // if (!this.videoId)
    // this.roomstatService
    this.roomstatService.getHostRoom(this.roomId)
    .subscribe((data) => {

      console.log('Selected video on init: ', this.roomstatService.getSelectedVideo())
      if (!this.videoId) {
        console.log('grabbing roomdata from database: ', data, 'with video data as:', data.video_url)
        // this.roomstatService.setVideo(this.roomId, this.roomstatService.getSelectedVideo())
        this.videoId = data.video_url
      }

      this.checkList = this.socketService.recieveGuestList()
      .subscribe((data)=>{
        this.guestList = data;
        this.nameList = []
        this.guestList.forEach((person)=>{
          this.postService.getNames(person)
          .subscribe((data)=>{
            this.nameList.push(data.first_name)
          })
        })
        console.log('room participants:', this.guestList, data)
      })
      
      this.connection = this.socketService.onConnect()
      .subscribe(()=>{

      
        this.ioInit();
        this.connection = this.socketService.recieveStateChange()
        .subscribe((state)=>{ 
          console.log('Getting new state from socket server: ', state)
          if (Number(state[0]) === 1) {
            //socket over play request
            this.player.seekTo(state[1])
            this.player.playVideo();
          } else if (Number(state[0]) === 2) {
            //socket over pause request to peers
            this.player.seekTo(state[1])
            this.player.pauseVideo();
          } else if (state[0] === '3') {
            //Buffering- means socket over seekto request to peers /or/ video change
            this.player.seekTo();
          } else if (state[0] === '5') {
            //Video cued up, socket over queue
          }
        });
        this.socketService.onDisconnect()
        .subscribe(()=>{
          this.socketService.leftRoom(this.roomId, this.username)
        })
      });

      // this.requestResponse = this.socketService.requestResponse()
      // .subscribe((res) => {
      //   console.log(res);
      //   if (res === 'pause') {
      //     //pop up message as pause
          
      //   } else if (res === 'play') {
      //     //pop up message as play

      //   } else {
      //     //pop up message to fast forward to time specified as res

      //   }

      // });
      this.socketService.requestGuestList(this.roomId);
      (<any>window).onYouTubeIframeAPIReady = () => {
        this.player = new window['YT'].Player('player', {
          height: '390',
          width: '640',
          videoId: this.videoId,
          playerVars: { 'autoplay': 0, 'controls': 1, rel: 0 },
          events: {
            'onReady': onPlayerReady,
            'onStateChange': this.onPlayerStateChange
          }
        });
        this.iframeElem = document.getElementById('player');
        if (!this.isHost) {
          this.iframeElem.setAttribute('style', 'pointer-events: none;')
        }
        this.rendered = true;
        console.log('finished initing')
      }

      
      function onPlayerReady(event) {
        console.log('Player loaded: ', this.player)
        // event.target.playVideo();

        this.roomstatService.setPlayer(this.player)
      }
      console.log('checking host before close', this.host)
    }); 
    }
    
    ngOnChanges(changes: SimpleChanges) {
      if (this.player) {
        this.player.loadVideoById(this.videoId)
      }
    }
    
    ioInit() {
      this.socketService.signalTest()
    console.log('checking io', this.socketService.socketIo)
    if (!this.roomId) {
      this.roomId = '1';
    }

    

    // this.socketService.joinRoom(this.roomId)
  }

  

  onPlayerStateChange = (event) => {

    console.log('PLAYER INFO!!!!: ', this.player);
    // this.player.loadVideoByUrl('https://player.twitch.tv/?channel=masgamerstv')
    console.log(this.iframeElem);
    if (this.isHost) {
      // this.player.playerVars.controls = 0;
      console.log('Player state changed: ', this.player.getPlayerState(), this.player.getCurrentTime());
      console.log(this.player);
      let state = this.player.getPlayerState();
      this.socketService.stateChange(this.roomId, state, this.player.getCurrentTime(), this.afAuth.auth.currentUser.email)

    }

    if (event.data == window['YT'].PlayerState.PLAYING && !this.done) {
      setTimeout(this.stopVideo, 6000);
      this.done = true;
    }
    this.player.getPlayerState();
  }
  stopVideo = () => {
    // this.player.stopVideo();
  }


  // unloadHandler(event){
  //   this.roomstatService.updateRoomstat(this.roomId, {
  //     peer_id: 'closed',
  //   })
  // }

  skipTo = () => {
    let seconds = 0;
    let time = this.time.split('.');
    let magnitude = 0;
    for (let i = time.length-1; i >= 0; i--){
        seconds += parseInt(time[i]) * 60 ** magnitude;
      magnitude+= 1;
    }
    this.socketService.skipToRequest(this.roomId, this.username, String(seconds));
  }

  pauseRequest = () => {
    console.log('submitting pause req..')
    this.socketService.pauseRequest(this.roomId, this.username);
  }

  playRequest = () => {
    console.log('submitting play req..')
    this.socketService.playRequest(this.roomId, this.username);
  }
}
