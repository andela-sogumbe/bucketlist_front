import { Component} from '@angular/core';
import {Router} from '@angular/router';

declare var jQuery: any;
declare var Materialize: any;

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent{ 

  // initialize global variables
  constructor(private router: Router){}


}