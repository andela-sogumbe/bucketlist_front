import { Component } from '@angular/core';

@Component({
  selector: 'item',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent {

  email: string;
  password: string;
  
  constructor(){
    this.email = 'adams@andela.com',
    this.password = 'adams123'
  }

}