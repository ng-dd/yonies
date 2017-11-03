import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  @Input() private socketService: SocketService;
  @Input() roomId: string;
  @Input() username: string;
  @Input() player: any;
  @Output() updatePlayer: EventEmitter<any> = new EventEmitter(); 

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
  userID: string;

  toggleRoom: boolean = true;
  connection: any;
  userList: any;
  messageWatch: any;
  userDisconnect: any;
  stateWatch: any;



  constructor(
    private afAuth: AngularFireAuth,
    private roomstatService: RoomstatService,
  ) { 
    this.chatInitiated = false;
    this.roomAvailable = false;
    this.haveHostName = false;
    this.haveUserName = false;
    this.userInRoom= false;
    this.chatEnded = false;

    this.hostName = '';
    this.hostID = '';
    this.userID = '';
  }

  // Room group chat functions
  openChatRoom(): void {
    this.toggleRoom = !this.toggleRoom;
  }

  // // Start a room as the host
  // getHostApproval(): void {
  //   this.socket.emit('getHostSocketid');
  // }



  // initChat(): void {
  //   if (!this.socket.connected) {
  //     this.socket.connect();
  //   }
  //   this.chatInitiated = true;
  //   this.haveUserName = false;
  //   if (this.friendWantsToChat) {
  //     this.friendWantsToChat = false;
  //   } else {
  //     this.friendWantsToChat = true;
  //   }
  // }

  handleUserChatRequest(): void {
    this.chatEnded = false;
    this.userID = this.socket.id;
    // this.username = $('#chat-username').val || 'user';
    this.haveUserName = true;    
    this.socket.emit('userRequestInitChat', this.username, this.userID);
  }

  // Send a Message formatting
  handleSendMessage(): void {
    // const message = $('#chat-input').val();
    this.socketService.sendMessage(this.roomId, this.chatInput, this.username);
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
    // this.username = '';
    this.userID = '';
    this.chatEnded = true;
    this.socket.emit('ended', this.hostID);
  }

  ngOnInit() {
    console.log('player from inside chat comp', this.player)
    // console.log('looking at current user', this.afAuth.auth.currentUser)
    // this.connection = this.socketService.onConnect()
    // .subscribe(()=>{
    this.stateWatch = this.socketService.requestResponse()
    .subscribe((res)=> {
      console.log('processing request for state change in chat: ', res)
      let lastElement = document.getElementById('chat-log').firstChild
      let request = document.createElement('ul');
      request.className += 'message';
      if (res[0] === 'pause') {
        request.className += 'pause'
        request.addEventListener('click', ()=> {this.updatePlayer.emit('pause')})
        request.appendChild(document.createTextNode(res[1]+ ' has made a '+ res[0] + ' request'))
      } else if (res[0] === 'play') {
        request.className += 'play'
        request.addEventListener('click', ()=> {this.updatePlayer.emit('play')})
        request.appendChild(document.createTextNode(res[1]+ ' has made a '+ res[0] + ' request'))
      } else {
        request.addEventListener('click', ()=> {this.updatePlayer.emit(res[1])})
        request.appendChild(document.createTextNode(res[0]+ ' has made a request to skip to '+ res[1]));
      }
      document.getElementById('chat-log').insertBefore(request, lastElement);
    });

      this.socketService.displayUser(this.roomId, this.username);
      this.userList = this.socketService.newUser()
      .subscribe((username) => {
        let user = document.createElement('h3');
        user.id += username;
        user.appendChild(document.createTextNode(username));
        console.log('looking at username dom ele: ', user)
        document.getElementById('users').appendChild(user);
      })

      this.userDisconnect = this.socketService.removeUser()
      .subscribe((username)=> {
        document.getElementById(this.username).remove()
      })

      this.messageWatch = this.socketService.recieveMessages()
      .subscribe((response) =>{
        let lastElement = document.getElementById('chat-log').firstChild
        let author = document.createElement('ul');
        author.appendChild(document.createTextNode(response[0]));
        author.className += 'author';
        let message = document.createElement('ul');
        message.className += 'message';
        message.appendChild(document.createTextNode(response[1]));
        document.getElementById('chat-log').insertBefore(author, lastElement).appendChild(message);
      })
    // })
      
      // // Socket  -- Listeners
      // this.socket.on('hostSocketid', (socketid) => {
        //   this.socket.emit('ended', socketid);
    // });

    // // Socket -- Start Chat 
    // this.socket.on('waitingForHost', (username) => {
    //   this.userInRoom = true;
    // });

    // this.socket.on('startChatWithUserAndHost', (username, userID, hostName) => {
    //   this.hostName = hostName;
    //   this.haveHostName = true;

    //   if (username  === this.username && userID === this.userID ) {
    //     this.roomAvailable = true;
    //   }
    // });

    // // Socket -- Chat Messages, add as bullet points to HTML with scroll

    // this.socket.on('chatMessages', (msg, sender) => {
    //   // $('#chat-messages').append($('<li>').text(msg + ' ~  ' + sender));
    //   // $('#chat-messages').scrollTop($('#chat-messages')[0].scrollHeight);
      
    // });

    // this.socket.on('connectedWith', (user, id) => {
    //   this.hostName = user;
    //   this.hostID = id;
    // });

    // // Socket -- End Chat

    // this.socket.on('ended', () => {
    //   this.socket.disconnect();
    //   this.handleEndChat();
    // });
    this.socketService.onDisconnect()
    .subscribe(()=>{
      // document.getElementById(this.username).remove()
      this.socketService.leftRoom(this.roomId, this.username);
    })
  }


}
