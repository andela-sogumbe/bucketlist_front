import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {
  name: string;
  email: string;
  password: string;

  constructor(private router: Router){
  }

  redirectPage(){
    // Navigate to the login page with extras
    this.router.navigate(['/login']);
    return false;
  }

  onSubmit() {

  }
}
