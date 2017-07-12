import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class AuthService{

    url = 'http://localhost:5000/api/v1/auth/'

    constructor(private http: Http){}

    // authenticate registered user
    authLogin(email:string, password:string){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.url + 'login/',
        JSON.stringify({"email": email, "password": password}), options)
            .map(response => response.json())
            .catch(errors => { 
                return Observable.throw(errors.json())
            });
    }
    
    // add user to user table in the database
    authRegister(name:string, email:string, password:string){
        return this.http.post(this.url + 'register/', JSON.stringify({name, email, password}))
            .map(response => response.json())
            .catch(errors => { 
                return Observable.throw(errors.json())
            });
    }
}

@Injectable()
export class BucketService{

    url = 'http://localhost:5000/api/v1/bucketlists/'

    constructor(private http: Http){}

    // create a bucket list
    createBucket(name:string){
        let token = localStorage.getItem('current_user');
        let headers = new Headers({ 'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token});
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.url, JSON.stringify({"name":name}), options)
            .map(response => response.json())
            .catch(errors => { 
                return Observable.throw(errors.json())
            });
    }

    // get all bucket lists
    getAllBuckets(){
        let token = localStorage.getItem('current_user');
        let headers = new Headers({ 'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token});
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.url, options)
            .map(response => response.json())
            .catch(errors => { 
                return Observable.throw(errors.json())
            });
    }

    // get single bucket list
    getSingleBucket(bucketId:number){
        return this.http.get(this.url + bucketId)
            .map(response => response.json())
            .catch(errors => { 
                return Observable.throw(errors.json())
            });
    }

    // update bucket list
    updateBucket(bucketId:number, name:string){
        return this.http.put(this.url + bucketId, JSON.stringify({name}))
            .map(response => response.json())
            .catch(errors => { 
                return Observable.throw(errors.json())
            });
    }

    // update bucket list
    deleteBucket(bucketId:number){
        let token = localStorage.getItem('current_user');
        let headers = new Headers({ 'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token});
        let options = new RequestOptions({ headers: headers });
        return this.http.delete(this.url + bucketId, options)
            .map(response => response.json())
            .catch(errors => { 
                return Observable.throw(errors.json())
            });
    }

    // get bucket lists with names containing the value of 'q'
    searchBucket(name:string){
        return this.http.get(this.url +'?q=' + name)
            .map(response => response.json())
            .catch(errors => { 
                return Observable.throw(errors.json())
            });
    }
}

@Injectable()
export class ItemService{

    url = 'http://localhost:5000/api/v1/bucketlists/'

    constructor(private http: Http){}

    // create bucket list item
    createItem(bucketId:number, name:string){
        this.http.post(this.url + bucketId + '/items/', JSON.stringify({name}))
            .map(response => response.json())
            .catch(errors => { 
                return Observable.throw(errors.json())
            });
    }

    // create bucket list item
    updateItem(bucketId:number, itemId:number, name:string){
        this.http.put(this.url + bucketId + '/items/' + itemId, JSON.stringify({name}))
            .map(response => response.json())
            .catch(errors => { 
                return Observable.throw(errors.json())
            });
    }

    // delete bucket list item
    deleteItem(bucketId:number, itemId:number){
        this.http.delete(this.url + bucketId + '/items/' + itemId)
            .map(response => response.json())
            .catch(errors => { 
                return Observable.throw(errors.json())
            });
    }
}