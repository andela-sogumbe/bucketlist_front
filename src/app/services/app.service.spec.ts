import {BucketService} from './app.service';

import {TestBed, inject, async} from '@angular/core/testing';
import {HttpModule, Http, XHRBackend, Response, ResponseOptions, BaseRequestOptions} from '@angular/http';
import {MockBackend} from '@angular/http/testing';

describe('BucketService', ()=>{

    beforeEach(async(()=>{
        TestBed.configureTestingModule({
            providers: [
                BucketService, 
                MockBackend, 
                BaseRequestOptions,
                {
                    provide: Http, 
                    deps:[MockBackend, BaseRequestOptions],
                    useFactory: (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
                        return new Http(backend, defaultOptions)
                    }
                }
            ],
            imports: [HttpModule],
        });
        TestBed.compileComponents();
    }));

    describe('createBucket', ()=>{

    });

});