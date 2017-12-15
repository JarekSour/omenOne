import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MainProvider } from '../providers/main/main';
import { Facebook } from '@ionic-native/facebook';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    pages: Array<{ title: string, component: any }>;

    constructor(
        public fb: Facebook,
        public mainService: MainProvider,
        public platform: Platform,
        public statusBar: StatusBar,
        public splashScreen: SplashScreen
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.fb.getLoginStatus().then(res => {
                if (res["status"] == 'connected') {
                    if (localStorage.getItem('identidad') === null) {
                        this.nav.setRoot('HumanPage');
                    } else {
                        this.nav.setRoot('HomePage');
                    }
                } else {
                    this.nav.setRoot('LoginPage');
                }
            });
        });
    }

    goToPage(page) {
        switch (page) {
            case 'comentario':
                this.nav.push('ComentarioPage');
                break;
            case 'audio':
                this.nav.push('AudioPage');
                break;
            case 'imagen':
                this.nav.push('ImagenPage');
                break;
            case 'procedimiento':
                this.nav.push('ProcedurePage');
                break;
            case 'clinico':
                this.nav.push('ClinicPage');
                break;
            case 'perfil':
                this.nav.push('ProfilePage');
                break;
            default:
                break;
        }
    }

    closeSession() {

        this.fb.logout()
            .then(res => {
                localStorage.clear();
                this.nav.setRoot('LoginPage');
            })
    }

}
