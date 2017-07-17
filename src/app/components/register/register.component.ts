import { Component, AfterViewInit, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AuthService } from '../../services/app.service';

declare var jQuery: any;
declare var Materialize: any;
declare var grecaptcha: any;

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AuthService]
})

export class RegisterComponent implements AfterViewInit, OnInit{
  name: string;
  email: string;
  password: string;
  token: string;
  authResponse: RegisterResponse;
  errorMessages: string;
  recaptchaSuccess = false;
  secretKey = '6LeZUykUAAAAABcKtRMyM5jOZ_6FIVsHWrIKx-EF';

  constructor(private router: Router, private authService: AuthService){

  }

  redirectPage(){
    // Navigate to the login page with extras
    this.router.navigate(['/login']);
    return false;
  }

  // after all components have been loaded execute jquery
  ngAfterViewInit(){
    
  }

  // on page load authenticate user
  ngOnInit(){
    let login_status = localStorage.getItem('login_status');
    if(login_status == "1"){
      this.router.navigate(['/dashboard']);
    }
    
    jQuery(document).ready(function(){
      grecaptcha.render('recaptcha_display', {
        'sitekey' : '6LeZUykUAAAAAFYI2wcLXbsKvtC7gj-PEEVbv8y3',
      });
    });

  }

  registerUser() {

    if(this.recaptchaSuccess == false){

      if(!grecaptcha.getResponse()){
        Materialize.toast('Please prove that you are human by clicking on the recaptcha check box', 5000);
        return false
      }

      let recaptchaToken = grecaptcha.getResponse();
      if(recaptchaToken.length < 1){
        Materialize.toast('Please prove that you are human by clicking on the recaptcha check box', 5000);
        return false;
      }
      this.authService.authValidateRecaptcha(this.secretKey, recaptchaToken).subscribe(recaptchaResponse => {
        if(recaptchaResponse.success){
          this.recaptchaSuccess = true;

          this.authService.authRegister(this.name, this.email, this.password).subscribe(response => {
          this.authResponse = response;
          if(this.authResponse.user_token != ''){
              localStorage.setItem('current_user', this.authResponse.user_token);
              localStorage.setItem('login_status', '1');
              this.router.navigate(['/dashboard']);
          }
          else{
            localStorage.setItem('current_user', '');
            localStorage.setItem('login_status', '0');
            this.errorMessages = JSON.stringify(this.authResponse.messages).replace(/[\]'_}"{[]/g, '')
            Materialize.toast(this.errorMessages, 5000);
          }
        }, errors => {
            Materialize.toast("Error connecting to the database", 5000);
        })

        }else{
          Materialize.toast("Incorrect Recaptcha", 5000);
        }
      }, errors => {
          Materialize.toast("Error connecting to the database", 5000);
      });

    }

    if(this.recaptchaSuccess){
      this.authService.authRegister(this.name, this.email, this.password).subscribe(response => {
        this.authResponse = response;
        if(this.authResponse.user_token != ''){
            localStorage.setItem('current_user', this.authResponse.user_token);
            localStorage.setItem('login_status', '1');
            this.router.navigate(['/dashboard']);
        }
        else{
          localStorage.setItem('current_user', '');
          localStorage.setItem('login_status', '0');
          this.errorMessages = JSON.stringify(this.authResponse.messages).replace(/[\]'_}"{[]/g, '')
          Materialize.toast(this.errorMessages, 5000);
        }
      }, errors => {
          Materialize.toast("Error connecting to the database", 5000);
      })
    }
  }
}

interface RegisterResponse{
    messages;
    user_token: string;
}
