import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SignalProvider {

    constructor(public http: Http) { }

    updateOxigenacion(json) {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');

            this.http.post('http://middle.mybluemix.net/signo/oxigenacion/set', JSON.stringify(json), { headers: headers })
                .subscribe(res => {
                    resolve(res.json());
                }, (err) => {
                    reject(err);
                });
        });
    }

    updateTemperatura(json) {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');

            this.http.post('http://middle.mybluemix.net/signo/temperatura/set', JSON.stringify(json), { headers: headers })
                .subscribe(res => {
                    resolve(res.json());
                }, (err) => {
                    reject(err);
                });
        });
    }

}
