import { Component, AfterViewInit, OnInit } from '@angular/core';
import { BucketService } from '../../services/app.service'
import {Router} from '@angular/router';

declare var jQuery: any;
declare var Materialize: any;

@Component({
  selector: 'dash',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [BucketService]
})
export class DashboardComponent implements AfterViewInit, OnInit{
  search: string;
  bucket: string;
  limit: string;
  bucketResponse: bucketResponse;
  keys: string[];
  bucketId: number;
  errorMessages: string;

  constructor(private router: Router, private bucketService: BucketService){
    
  }

  ngAfterViewInit(){
    jQuery(document).ready(function(){
      //jquery code here
    });
  }

  ngOnInit(){
    this.bucketService.getAllBuckets().subscribe(response => {
      this.bucketResponse = response;
      this.keys = Object.keys(this.bucketResponse.bucketlists)
    })
  }

  onSubmit(){
    
  }

  // create new bucket
  newBucket(){
    this.bucketService.createBucket(this.bucket).subscribe(response => {
      this.bucketResponse = response;
      if(this.bucketResponse.messages == "create_success"){
        window.location.reload()
      }else{
        this.errorMessages = JSON.stringify(this.bucketResponse.messages)
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
        this.errorMessages = JSON.stringify(this.bucketResponse.messages)
        Materialize.toast(this.errorMessages, 5000);
      }
    })
  }
}

interface bucketResponse{
    messages;
    bucketlists;
}