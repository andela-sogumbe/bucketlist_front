import { Component, AfterViewInit, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AuthService } from '../../services/app.service';

declare var jQuery: any;
declare var Materialize: any;

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})

export class LoginComponent  implements AfterViewInit, OnInit{
  email: string;
  password: string;
  token: string;
  authResponse: loginResponse;
  errorMessages: string;

  constructor(private router: Router, private authService: AuthService){
    
  }

  // after all components have been loaded execute jquery
  ngAfterViewInit(){
    jQuery(document).ready(function(){
      //jquery code here
    });
  }

  // on page load authenticate user
  ngOnInit(){
    let login_status = localStorage.getItem('login_status');
    if(login_status == "1"){
      this.router.navigate(['/dashboard']);
    } 
  }

  redirectPage(){
    // Navigate to the login page with extras
    this.router.navigate(['/register']);
    return false;
  }

  loginUser() {
    this.authService.authLogin(this.email, this.password).subscribe(response => {
      this.authResponse = response;
      if(this.authResponse.user_token != ''){
          localStorage.setItem('current_user', this.authResponse.user_token);
          localStorage.setItem('login_status', '1');
          this.router.navigate(['/dashboard']);
      }
      else{
        localStorage.setItem('current_user', '');
        localStorage.setItem('login_status', '0');
        this.errorMessages = JSON.stringify(this.authResponse.messages).replace(/[\]}"{[]/g, '')
        Materialize.toast(this.errorMessages, 5000);
      }
    })
  }
}

interface loginResponse{
    messages;
    user_token: string;
}
