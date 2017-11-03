import { Component, OnInit } from '@angular/core';
import { SocketIoModule, SocketIoConfig, Socket } from 'ng-socket-io';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth'
import { SocketService } from '../services/socket.service'
import { RoomstatService } from '../services/roomstat.service'

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
  chatInput: string;

  socket= io();

  userQueue: Array<any>;
  hostName: string;
  hostID: string;
  username: string;
  userID: string;

  toggleRoom: boolean = true;

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
    this.toggleRoom = !this.toggleRoom;
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
    this.haveUserName = true;    
    this.socket.emit('userRequestInitChat', this.username, this.userID);
  }

  // Send a Message formatting
  handleSendMessage(): void {
    // const message = $('#chat-input').val();
    this.socket.emit('chatMessage', this.chatInput, this.username);
    // $('#chat-input').val('');
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



// // Other


//   // init chat
//   getQueueSize(): void {
//     this.socket.emit('getQueueSize');
//   }

//   getUserCredentials(): void {
//     this.socket.emit('getUserSocketid');
//     this.socket.emit('getUsername');
//   }

//   handleChatRequest(): void {
//     if (this.queueSize > 0) {
//       this.chatInitiated = true;
//       this.haveUsername = false;
//       if (!this.socket.connected) {
//         this.socket.connect();
//       }
//     }
//   }

//   handleAdminAccept(): void {
//     this.haveUsername = true;
//     this.adminName = $('#chat-username').val() || 'admin';
//     this.adminID = this.socket.id;
//     console.log('admin id is ', this.adminID);
//     this.socket.emit('adminAcceptChat', this.adminName, this.adminID);
//     this.roomAvailable = true;
//   }

  // // handle chat
  // handleSendMessage(): void {
  //   const message = $('#chat-input').val();
  //   this.socket.emit('chatMessage', message, this.adminName);
  //   $('#chat-input').val('');
  //   console.log('ADMIN sending message of', message);
  // }

//   // end chat
//   handleEndChat(): void {
//     this.getUserCredentials();
//     this.chatInitiated = false;
//     this.roomAvailable = false;
//     this.username = '';
//     this.userID = '';
//     this.chatEnded = true;
//     this.haveUsername = false;
//     this.socket.emit('ended', this.userID);
//   }

//   ngOnInit() {
//     this.getQueueSize();
    
//     // Event Listeners
//     this.socket.on('username', (username) => {
//       this.username = username;
//     });

//     this.socket.on('chatMessagesAdmin', (msg, sender) => {
//       $('#chat-messages-admin').append($('<li>').text(msg + ' ~ ' + sender));
//       console.log('Admin recvd msg ' + msg + ' from sender ' + sender);
//     });

//     this.socket.on('userSocketid', (socketid) => {
//       this.socket.emit('ended', socketid);
//       this.getQueueSize();
//     });

//     this.socket.on('firstInLine', (username, socketid) => {
//       this.username = username;
//       this.userID = socketid;
//       this.haveUsername = true;
//     });

//     this.socket.on('updateQueue', (length) => {
//       this.queueSize = length;
//     });

//     this.socket.on('connectedWith', (user, id) => {
//       this.username = user;
//       this.userID = id;
//     });

//     // end chat
//     this.socket.on('ended', () => {
//       this.chatEnded = true;
//       this.socket.disconnect();
//       this.handleEndChat();
//     });
//   }

// }
