import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { ScriptService } from '../services/script.service';
import * as SimplePeer from 'simple-peer'; //webrtc 
// import * as YT from 'youtube';

@Component({
  selector: 'app-stream-view',
  templateUrl: './stream-view.component.html',
  styleUrls: ['./stream-view.component.css']
})
export class StreamViewComponent implements OnInit, AfterViewInit {
  incoming: string;
  // YT: any = window;
  p: any;
  n: any = navigator;
  player: any;
  // scripts: any = {};
  done: boolean = false;
  videoUrl: SafeResourceUrl;
  constructor(private sanitizer: DomSanitizer, private script: ScriptService) {
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
      // this.sanitizer.bypassSecurityTrustScript(
        
        // )
        this.p = new SimplePeer({ initiator: location.hash === '#1', trickle: false });
        this.p.on('error', (err) => { console.log('error', err) });
        this.p.on('signal', function (data) {
          console.log('SIGNAL', JSON.stringify(data))
          document.querySelector('#outgoing').textContent = JSON.stringify(data);
        });
        
        document.querySelector('form').addEventListener('submit', function (ev) {
          ev.preventDefault();
          this.p.signal(JSON.parse(this.incoming));
        });
        
        this.p.on('connect', function () {
          console.log('CONNECT');
          this.p.send(this.videoUrl);
        });
        
        this.p.on('data', function (data) {
          console.log('data: ' + data);
        });
        
        (<any>window).onYouTubeIframeAPIReady = () => {
          this.player = new window['YT'].Player('player', {
            height: '390',
            width: '640',
            videoId: 'M7lc1UVf-VE',
            events: {
              'onReady': onPlayerReady,
              'onStateChange': this.onPlayerStateChange
            }
          });
          
          
          
        }
        
        function onPlayerReady(event) {
          // console.log('Player loaded: ', this.player)
          event.target.playVideo();
        }
      }
      
      onPlayerStateChange= (event) => {
        console.log('Player state changed: ', this.player.getPlayerState(), this.player.getCurrentTime())
        console.log(this.player)
        this.player.j.videoUrl="https://player.twitch.tv/?channel=xenosysvex"
        
        if (event.data == window['YT'].PlayerState.PLAYING && !this.done) {
          setTimeout(this.stopVideo, 6000);
          this.done = true;
        }
        this.player.getPlayerState()
      }
       stopVideo = () =>{
        this.player.stopVideo();
      }
      
      
    }
