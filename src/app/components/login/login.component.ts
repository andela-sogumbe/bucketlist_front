import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { AuthService } from '../../services/app.service'

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})

export class LoginComponent {
  email: string;
  password: string;
  token: string;
  authResponse: loginResponse;

  constructor(private router: Router, private authService: AuthService){

  }

  redirectPage(){
    // Navigate to the login page with extras
    this.router.navigate(['/register']);
    return false;
  }

  onSubmit() {
    this.authService.authLogin(this.email, this.password).subscribe(response => {
      this.authResponse = response;
      if(this.authResponse.user_token.length > 0){
          localStorage.setItem('current_user', this.authResponse.user_token);
          this.router.navigate(['/dashboard']);
      }
      else{
        localStorage.setItem('current_user', '');
      }
    })
  }
}

interface loginResponse{
    messages;
    user_token: string;
}
