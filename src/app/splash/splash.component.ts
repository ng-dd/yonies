import { Component, OnInit, ElementRef } from '@angular/core';
import { ScriptService } from '../services/script.service';
// import * as anime from './anime.min.js'

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss']
})
export class SplashComponent implements OnInit {
  // DOM: any;
  // anime: any;

  constructor(
    // el: ElementRef,
    // private script: ScriptService
  ) { 
    // this.script.load('anime')
    // .then((data) => { console.log('Script loaded: ', data, window) })
    // .catch((err) => { console.log(err) });
  }
  
  ngOnInit() {
    // console.log('scrippppppt', window[])
    // this.DOM = {};
    // this.DOM.el = document.createElement('div');;
    // this.DOM.paths = Array.from(this.DOM.el.querySelectorAll('path'));
    // this.animate();
  }

  // animate() {
    // setTimeout(() => document.body.classList.add('render'), 60);
    
    //   animate() {
    //     this.DOM.paths.forEach((path) => {
    //       setTimeout(() => {
    //         this.anime({
    //           targets: path,
    //           duration: this.anime.random(3000,5000),
    //           easing: [0.5,0,0.5,1],
    //           d: path.getAttribute('pathdata:id'),
    //           loop: true,
    //           direction: 'alternate'
    //         });
    //       }, this.anime.random(0,1000));
    //     });
    //   }
    // };
    // new MightyMorphingPowerRangers(document.querySelector('svg.scene'));
    

}

  


