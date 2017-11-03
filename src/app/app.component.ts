import { Component } from '@angular/core';

// Firebase
import { AuthService } from './services/auth.services';
import { UserService } from './services/user.service';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Yonies';
  user: Observable<firebase.User>;

  // Pass in fire auth and db
  constructor(public afAuth: AngularFireAuth) {
    
    this.user = this.afAuth.authState;
  }

}
