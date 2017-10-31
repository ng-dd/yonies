import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.services'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    //login variables
    loginEmail: string;
    loginPassword: string;
  
    //registration variables
    selectedFiles: FileList;
    firstname: string;
    lastname: string;
    newUser: boolean = true;
    passReset: boolean = false;
    email: string;
    password: string; 
    uid: string;
    rForm: FormGroup;
    url: string;
  

  constructor( private auth: AuthService, private fb: FormBuilder) {
    this.rForm = fb.group({
      'firstname': [null, Validators.required],
      'lastname': [null, Validators.required],
      'email': [null, Validators.compose([Validators.required, Validators.pattern("[^ @]*@[^ @]*")])],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(8)])]
    })
  }
  
  ngOnInit() {
    
  }
  login() {
    this.auth.login(this.loginEmail, this.loginPassword);
    this.email = this.password = '';
  }
  logout() {
    this.auth.logout();
  }
  facebookAuth() {
    this.auth.facebookLogin()
  }

  googleAuth() {
    this.auth.googleLogin();
  }

  twitterAuth() {
    this.auth.twitterLogin();
  }

  signup(): void {
    console.log(this.email, this.password, this.firstname, this.lastname)
    this.auth.signup(this.email, this.password, this.firstname, this.lastname)
  }
}
