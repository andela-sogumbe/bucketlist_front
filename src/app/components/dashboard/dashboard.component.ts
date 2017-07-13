import { Component, AfterViewInit, OnInit } from '@angular/core';
import { BucketService, AuthService, ItemService } from '../../services/app.service'
import {Router} from '@angular/router';

declare var jQuery: any;
declare var Materialize: any;

@Component({
  selector: 'dash',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [BucketService, AuthService, ItemService]
})
export class DashboardComponent implements AfterViewInit, OnInit{
  search: string;
  bucket: string;
  limit: string;
  bucketResponse: bucketResponse;
  keys: string[];
  bucketId: number;
  errorMessages: string;
  itemName: string;

  constructor(private router: Router, private itemService: ItemService, private bucketService: BucketService, private authService: AuthService){
    
  }

  // after all components have been loaded execute jquery
  ngAfterViewInit(){
    jQuery(document).ready(function(){
      jQuery('.modal').modal();
      jQuery('#newItem').keyup(function(e) {
        if(e.which == 13) {
            jQuery('#newitemmodal').modal('close');
        }
      });
    });
  }

  // on page load authenticate user and get all buckets
  ngOnInit(){
    let login_status = localStorage.getItem('login_status');
    if(login_status != "1"){
      this.router.navigate(['/login']);
      return false;
    }else{
      this.bucketService.getAllBuckets().subscribe(response => {
      this.bucketResponse = response;
      if(this.bucketResponse.bucketlists){
        this.keys = Object.keys(this.bucketResponse.bucketlists)
      }
      Materialize.toast(JSON.stringify(this.bucketResponse.messages).replace(/[\]}"_{[]/g, ' '), 5000)
    })
    }
  }

  // search for bucket list name or id
  searchBuckets(){
    this.bucketService.searchBucket(this.search, this.limit).subscribe(response => {
      this.bucketResponse = response;
      if(this.bucketResponse.messages == "list_success"){
        this.router.navigate(['/dashboard']);
        this.bucketResponse = response;
      }else{
        this.errorMessages = JSON.stringify(this.bucketResponse.messages).replace(/[\]}"{[]/g, '')
        Materialize.toast(this.errorMessages, 5000);
      }
    })
  }

  // set the bucket list id of the item to be created
  setId(key){
    this.bucketId = jQuery('#bucketId' + key).html()
  }

  // create new bucket
  newBucket(){
    this.bucketService.createBucket(this.bucket).subscribe(response => {
      this.bucketResponse = response;
      if(this.bucketResponse.messages == "create_success"){
        window.location.reload()
      }else{
        this.errorMessages = JSON.stringify(this.bucketResponse.messages).replace(/[\]}"{[]/g, '')
        Materialize.toast(this.errorMessages, 5000);
      }
    })
  }

  // delete bucket
  deleteBucket(key){
    this.bucketId = jQuery('#bucketId' + key).html()
    this.bucketService.deleteBucket(this.bucketId).subscribe(response => {
      this.bucketResponse = response;
      if(this.bucketResponse.messages == "delete_single_success"){
        window.location.reload()
      }else{
        this.errorMessages = JSON.stringify(this.bucketResponse.messages).replace(/[\]}"{[]/g, '')
        Materialize.toast(this.errorMessages, 5000);
      }
    })
  }

  // create item
  createItem(){
    this.itemService.createItem(this.bucketId, this.itemName).subscribe(response => {
      this.bucketResponse = response;
      if(this.bucketResponse.messages == "create_item_success"){
        window.location.reload()
      }else{
        this.errorMessages = JSON.stringify(this.bucketResponse.messages).replace(/[\]}"{[]/g, '')
        Materialize.toast(this.errorMessages, 5000);
      }
    })
  }

  // view bucket list items
  viewItems(key){
    jQuery('#viewitemscontent').html(jQuery('#item'+key+'data').html());
  }

  logOutUser(){
    localStorage.setItem('login_status', '0');
    localStorage.setItem('current_user', '');
    this.router.navigate(['/login']);
  }

}

interface bucketResponse{
    messages;
    bucketlists;
}