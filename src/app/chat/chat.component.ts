import { Component, OnInit } from '@angular/core';
import { SocketIoModule, SocketIoConfig, Socket } from 'ng-socket-io';

declare var $: any;

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
