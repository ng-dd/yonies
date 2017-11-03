import { Component, OnInit, Input } from '@angular/core';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() socketService: SocketService;


  constructor() { }

  ngOnInit() {
  }
  scrollTop() {
    window.scrollTo(0, 0);
  }

  disconnectIo() {
  //   if (this.socketService) {
  //     this.socketService.disconnect()
  //   }
  }

}
