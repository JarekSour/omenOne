import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Platform, ToastController } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook'
import { SplashScreen } from '@ionic-native/splash-screen';

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {

    constructor(
        public menuCtrl: MenuController,
        public fb: Facebook,
        public navCtrl: NavController,
        public navParams: NavParams,
        public platform: Platform,
        public splashScreen: SplashScreen,
        public toastCtrl: ToastController,
    ) {
        this.menuCtrl.enable(false, 'menuSlide');
        this.platform.ready().then(() => {
            setTimeout(() => {
                this.splashScreen.hide();
            }, 100)
        })
    }

    ionViewDidLoad() { }

    loginUser() {
        this.fb.login(['public_profile', 'email'])
            .then((res: FacebookLoginResponse) => {
                if (res["status"] == 'connected') {
                    if (localStorage.getItem('identidad') === null) {
                        localStorage.setItem('idFacebook', res.authResponse.userID);
                        this.navCtrl.setRoot('HumanPage');
                    } else {
                        this.navCtrl.setRoot('HomePage');
                    }
                } else {
                    this.navCtrl.setRoot('LoginPage');
                }
            })
            .catch((e) => {
                if (e["errorMessage"] != "User cancelled dialog")
                    this.showToast('Ups! ocurrió un error, reintenta');
            });
    }

    showToast(msg) {
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 3000
        });
        toast.present();
    }

}
