import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';


@Injectable()
export class AuthService {
  user: Observable<firebase.User>;
  userKey: string;

  constructor(
    private firebaseAuth: AngularFireAuth,
  ) {
    this.user = firebaseAuth.authState;
  }

  confirmEmail() {
    let user = firebase.auth().currentUser;

    user.sendEmailVerification()
      .then(() => { console.log('email send') })
      .catch((err) => { console.log(err, 'error') })
  }

  resetPassword(email: string) {
    let auth = firebase.auth();
    return auth.sendPasswordResetEmail(email)
      .then(() => {
        console.log('email sent')
      })
      .catch((err) => {
        console.log(err, 'couldnt send email')
      })
  }

  signup(email: string, password: string, firstname: string, lastname: string) {
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Success!', value, value.uid);
        this.confirmEmail();
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });

  }

  facebookLogin() {
    firebase.auth()
      .signInWithRedirect(new firebase.auth.FacebookAuthProvider)
      .then(res => {
        console.log(res);
      });
  }

  googleLogin() {
    this.firebaseAuth.auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider)
      .then(res => {
        console.log(res);
      });
  }

  twitterLogin(): void {
    this.firebaseAuth.auth
      .signInWithPopup(new firebase.auth.TwitterAuthProvider)
      .then(res => {
        console.log(res)
      });
  }

  login(email: string, password: string) {
    this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Nice, it worked!');
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
  }

  logout() {
    this.firebaseAuth
      .auth
      .signOut();
  }

}