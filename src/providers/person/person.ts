import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PersonProvider {

    constructor(public http: Http, private socket: Socket) { }

    registro(json) {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');

            this.http.post('http://middle.mybluemix.net/registro', JSON.stringify(json), { headers: headers })
                .subscribe(res => {
                    resolve(res.json());
                }, (err) => {
                    reject(err);
                });
        });
    }

    getStaticData(json) {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');

            this.http.post('http://middle.mybluemix.net/humano/estatico/get', JSON.stringify(json), { headers: headers })
                .subscribe(res => {
                    resolve(res.json());
                }, (err) => {
                    reject(err);
                });
        });
    }

    updateEstaticData(json) {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');

            this.http.post('http://middle.mybluemix.net/humano/estatico/set', JSON.stringify(json), { headers: headers })
                .subscribe(res => {
                    resolve(res.json());
                }, (err) => {
                    reject(err);
                });
        });
    }

    getVariableData(json) {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');

            this.http.post('http://middle.mybluemix.net/humano/variable/get', JSON.stringify(json), { headers: headers })
                .subscribe(res => {
                    resolve(res.json());
                }, (err) => {
                    reject(err);
                });
        });
    }

    updateVariableData(json) {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');

            this.http.post('http://middle.mybluemix.net/humano/variable/set', JSON.stringify(json), { headers: headers })
                .subscribe(res => {
                    resolve(res.json());
                }, (err) => {
                    reject(err);
                });
        });
    }

    getSignos(json) {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');

            this.http.post('http://middle.mybluemix.net/signo/get', JSON.stringify(json), { headers: headers })
                .subscribe(res => {
                    resolve(res.json());
                }, (err) => {
                    reject(err);
                });
        });
    }

    getSocketSignos() {
        let observable = new Observable(observer => {
            this.socket.on(localStorage.getItem('identidad'), (data) => {
                observer.next(data);
            });
        })
        return observable;
    }

}
