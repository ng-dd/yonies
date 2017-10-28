// import { Injectable } from '@angular/core';

// @Injectable ()
// export class VideoPlayer {
//   player: any;
//   onYoutubeIframeAPIReady: any;
//   tag = document.createElement('script');
  
//   constructor(){
//     this.tag.src = "https://www.youtube.com/iframe_api";
//     let firstScriptTag = document.getElementsByTagName('script')[0];
//     firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
//     this.onYoutubeIframeAPIReady() {
//       this.player = new YT.Player('player', {
//         height: '390',
//         width: '640',
//         videoId: 'M7lc1UVf-VE',
//         events: {
//           'onReady': onPlayerReady,
//           'onStateChange': onPlayerStateChange
//         }
//       });
//     };
//   }
// }