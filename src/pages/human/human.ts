import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Platform, ToastController, LoadingController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PersonProvider } from '../../providers/person/person';
import { Facebook } from '@ionic-native/facebook';

@IonicPage()
@Component({
    selector: 'page-human',
    templateUrl: 'human.html',
})
export class HumanPage {

    loader: any;
    userProfile = { photoURL: '', displayName: '', email: '' };
    json = {
        players_id: '', identidad: '',
        Nacimiento: '', Sexo: '', Nacionalidad: '', Origen: '', TipoSangre: ''
    }

    constructor(
        public fb: Facebook,
        public loadingCtrl: LoadingController,
        public toastCtrl: ToastController,
        public personService: PersonProvider,
        public platform: Platform,
        public splashScreen: SplashScreen,
        public menuCtrl: MenuController,
        public navCtrl: NavController,
        public navParams: NavParams) {
        this.menuCtrl.enable(false, 'menuSlide');
        this.platform.ready().then(() => {
            setTimeout(() => {
                this.splashScreen.hide();
            }, 100)
        })
    }

    ionViewDidLoad() {
        let user = localStorage.getItem('idFacebook');
        this.fb.api('/' + user + '?fields=id,name,gender,email', []).then((response) => {
            this.json.identidad = response["id"];
            this.json.players_id = 'adc3a155-9d1c-4049-b792-1c08243103b1';
            this.userProfile.photoURL = "https://graph.facebook.com/" + response["id"] + "/picture?type=large";
            this.userProfile.displayName = response["name"];
            this.userProfile.email = response["email"];
        })
    }

    sendData() {
        this.showLoader();
        this.personService.registro({ players_id: this.json.players_id, identidad: this.json.identidad }).then((res) => {
            if (res['data'] == true) {
                this.personService.updateEstaticData(this.json).then((response) => {
                    if (response['data']) {
                        localStorage.setItem('identidad', this.json.identidad);
                        localStorage.setItem('players_id', this.json.players_id);
                        this.loader.dismiss();
                        this.navCtrl.setRoot('HomePage');
                    } else {
                        this.loader.dismiss();
                        this.showToast('Ups! ocurrió un error, reintenta');
                    }
                }, (err) => {
                    this.loader.dismiss();
                    this.showToast('Comprueba tu conexión a internet');
                });
            } else if(res['data'] == false) {
                localStorage.setItem('identidad', this.json.identidad);
                localStorage.setItem('players_id', this.json.players_id);
                this.loader.dismiss();
                this.navCtrl.setRoot('HomePage');
            }else{
                this.loader.dismiss();
                this.showToast('Ups! ocurrió un error, reintenta');
            }
        });

    }

    showLoader() {
        this.loader = this.loadingCtrl.create({
            content: "Enviando datos...",
            enableBackdropDismiss: false
        });
        this.loader.present();
    }

    showToast(msg) {
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 3000
        });
        toast.present();
    }

}
