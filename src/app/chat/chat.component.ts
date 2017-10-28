import { Component, OnInit } from '@angular/core';
import { SocketIoModule, SocketIoConfig, Socket } from 'ng-socket-io';

declare var $: any;

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  friendWantsToChat: boolean;
  chatInitiated: boolean;
  roomAvailable: boolean;
  haveHostName: boolean;  
  haveUserName: boolean;
  userInRoom: boolean;
  chatEnded: boolean;

  socket= io();

  userQueue: Array<any>;
  hostName: string;
  hostID: string;
  username: string;
  userID: string;

  constructor() { 
    this.chatInitiated = false;
    this.roomAvailable = false;
    this.haveHostName = false;
    this.haveUserName = false;
    this.userInRoom= false;
    this.chatEnded = false;

    this.hostName = '';
    this.hostID = '';
    this.username = '';
    this.userID = '';
  }

  // Room group chat functions

  openChatRoom(): void {
    $('.tap-target').tapTarget('open');
  }

  // Start a room as the host
  getHostApproval(): void {
    this.socket.emit('getHostSocketid');
  }

  initChat(): void {
    if (!this.socket.connected) {
      this.socket.connect();
    }
    this.chatInitiated = true;
    this.haveUserName = false;
    if (this.friendWantsToChat) {
      this.friendWantsToChat = false;
    } else {
      this.friendWantsToChat = true;
    }
  }

  handleUserChatRequest(): void {
    this.chatEnded = false;
    this.userID = this.socket.id;
    this.username = $('#chat-username').val || 'user';
    this.socket.emit('userRequestInitChat', this.username, this.userID);
  }

  // Send a Message formatting
  handleSendMessage(): void {
    const message = $('#chat-input').val();
    this.socket.emit('chatMessage', message, this.username);
    $('#chat-input').val('');
  }
  
  // Ending a room chat -- User in Room
  endChatWith(user): void {
    this.socket.emit('endChatWithUser', user);
  }

  // Ending a room chat -- Host decides to end the room chat

  handleEndChat(): void {
    this.endChatWith('host');
    this.haveUserName = false;
    this.chatInitiated = false;
    this.roomAvailable = false;
    this.username = '';
    this.userID = '';
    this.chatEnded = true;
    this.socket.emit('ended', this.hostID);
  }
  ngOnInit() {

    // Socket  -- Listeners
    this.socket.on('hostSocketid', (socketid) => {
      this.socket.emit('ended', socketid);
    });

    // Socket -- Start Chat 
    this.socket.on('waitingForHost', (username) => {
      this.userInRoom = true;
    });

    this.socket.on('startChatWithUserAndHost', (username, userID, hostName) => {
      this.hostName = hostName;
      this.haveHostName = true;

      if (username  === this.username && userID === this.userID ) {
        this.roomAvailable = true;
      }
    });

    // Socket -- Chat Messages, add as bullet points to HTML with scroll

    this.socket.on('chatMessages', (msg, sender) => {
      $('#chat-messages').append($('<li>').text(msg + ' ~  ' + sender));
      $('#chat-messages').scrollTop($('#chat-messages')[0].scrollHeight);
      
    });

    this.socket.on('connectedWith', (user, id) => {
      this.hostName = user;
      this.hostID = id;
    });

    // Socket -- End Chat

    this.socket.on('ended', () => {
      this.socket.disconnect();
      this.handleEndChat();
    });
  }

}
