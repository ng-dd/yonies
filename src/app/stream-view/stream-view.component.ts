import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { ScriptService } from '../services/script.service';
import * as SimplePeer from 'simple-peer'; //webrtc 
import { AngularFireAuth } from 'angularfire2/auth';
import { RoomstatService } from '../services/roomstat.service';
// import * as YT from 'youtube';

@Component({
  selector: 'app-stream-view',
  templateUrl: './stream-view.component.html',
  styleUrls: ['./stream-view.component.css']
})
export class StreamViewComponent implements OnInit, AfterViewInit {
  incoming: string;
  host: string;
  p: any;
  n: any = navigator;
  player: any;
  videoId: string = 'M7lc1UVf-VE';
  done: boolean = false;
  videoUrl: SafeResourceUrl;
  peerId: string;
  iframeElem: HTMLElement;
  guestList: object = [];
  counter: number = 0; 
  room: string = "2";
  constructor(
    private sanitizer: DomSanitizer,
    private script: ScriptService,
    private afAuth: AngularFireAuth,
    private roomstatService : RoomstatService,
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
    if (!this.host) { //set host UID uncomment when auth is established on page
      // this.host = this.afAuth.auth.currentUser.uid
    } else {
      this.peerId = String(this.counter);
      this.counter ++
    }
    this.p = new SimplePeer({ initiator: location.hash === '#1', trickle: false });
    this.p.on('error', (err) => { console.log('error', err) });
    this.p.on('signal', function (data) {
      console.log('SIGNAL', JSON.stringify(data));
      document.querySelector('#outgoing').textContent = JSON.stringify(data);
    });

    document.querySelector('form').addEventListener('submit', function (ev) {
      ev.preventDefault();
      this.p.signal(JSON.parse(this.incoming));
    });
    this.roomstatService.getHostId(this.room)
    this.p.on('connect', function () {
      console.log('CONNECT');
      this.p.signal(this.roomstatService.getHostId(this.room)); //connect to host via get
      this.p.send(this.videoUrl);
    });

    this.p.on('data', function (data) {
      console.log('data: ' + data);
    });

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



    }

    function onPlayerReady(event) {
      console.log('Player loaded: ', this.player)
      event.target.playVideo();
    }
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


}
