import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ProcedureProvider {

    constructor(public http: Http) { }

    sendProcedure(json) {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');

            this.http.post('http://middle.mybluemix.net/procedimiento/set', JSON.stringify(json), { headers: headers })
                .subscribe(res => {
                    resolve(res.json());
                }, (err) => {
                    reject(err);
                });
        });
    }
}
