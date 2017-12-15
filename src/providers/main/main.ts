import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class MainProvider {

    constructor(public http: Http) { }

    initApp() {
        return new Promise((resolve) => {
            if (localStorage.getItem("identidad") === null)
                resolve(false);
            else
                resolve(true);
        });
    }




}
