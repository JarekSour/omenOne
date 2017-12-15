import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Platform, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';
import { PersonProvider } from '../../providers/person/person'
import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
})
export class HomePage {

    seconds: any;
    hideImage: boolean;
    isNotFound: boolean;
    isPulso: boolean;
    isOxigenacion: boolean;
    isTemperatura: boolean;
    isPresion: boolean;
    isFrecuencia: boolean;
    pulso: any;
    oxigenacion: any;
    temperatura: any;
    precion: any;
    frecuencia: any;
    timeOut: any;
    isTimeOut: boolean;
    loader: any;
    tm: any;

    constructor(
        private socket: Socket,
        public alertCtrl: AlertController,
        public keyboard: Keyboard,
        public loadingCtrl: LoadingController,
        public personService: PersonProvider,
        public toastCtrl: ToastController,
        public menuCtrl: MenuController,
        public navCtrl: NavController,
        public navParams: NavParams,
        public splashScreen: SplashScreen,
        public platform: Platform,
    ) {
        this.menuCtrl.enable(true, 'menuSlide');
        this.platform.ready().then(() => {
            setTimeout(() => {
                this.splashScreen.hide();
                this.keyboard.disableScroll(false);
            }, 100)
        })
    }

    ionViewDidLoad() {
        this.showLoader();
        this.personService.getSignos({ identidad: localStorage.getItem('identidad'), players_id: localStorage.getItem('players_id') }).then((response) => {
            if (response['data']) {
                this.pulso = response['data']['Pulso'];
                this.oxigenacion = response['data']['Oxigenacion'];
                this.temperatura = response['data']['Temperatura'];
                this.precion = response['data']['Presion'];
                this.frecuencia = response['data']['Frecuencia'];

                if (response['data']['Pulso'] !== '')
                    this.isPulso = true
                if (response['data']['Oxigenacion'] !== '')
                    this.isOxigenacion = true;
                if (response['data']['Temperatura'] !== '')
                    this.isTemperatura = true;
                if (response['data']['Presion'] !== '')
                    this.isPresion = true;
                if (response['data']['Frecuencia'] !== '')
                    this.isFrecuencia = true;

            } else {
                this.isNotFound = true;
            }
            this.loader.dismiss()
        }).catch((err) => {
            this.showToast('Ups! ocurrio un error, verifica tu conexión a internet');
            this.loader.dismiss()
        });

        this.socket.connect();
        this.personService.getSocketSignos().subscribe(response => {
            this.pulso = response['data']['Pulso'];
            this.oxigenacion = response['data']['Oxigenacion'];
            this.temperatura = response['data']['Temperatura'];
            this.precion = response['data']['Presion'];
            this.frecuencia = response['data']['Frecuencia'];
            if (response['data']['Pulso'] !== '')
                this.isPulso = true
            if (response['data']['Oxigenacion'] !== '')
                this.isOxigenacion = true;
            if (response['data']['Temperatura'] !== '')
                this.isTemperatura = true;
            if (response['data']['Presion'] !== '')
                this.isPresion = true;
            if (response['data']['Frecuencia'] !== '')
                this.isFrecuencia = true;
        });
    }

    ionViewWillEnter() {
        this.menuCtrl.enable(true, 'menuSlide');
    }

    sendAlert() {
        this.hideImage = true;

        var n = 4.5;
        this.tm = setInterval(() => {
            n = n - 0.1;
            if (n < 0) {
                clearInterval(this.tm);
                this.hideImage = false;
            }
            this.seconds = n.toFixed(1);
        }, 100);

        this.timeOut = setTimeout(() => {
            this.isTimeOut = true;
            let alert = this.alertCtrl.create({
                title: 'Alerta!!',
                subTitle: 'Se esta enviando una alerta de emergencia',
                buttons: ['Aceptar']
            });
            alert.present();
        }, 4500);
    }

    stopAlert() {
        if (!this.isTimeOut) {
            this.showToast('Envio de alerta detenido...');
        }
        clearTimeout(this.timeOut);
        this.isTimeOut = false;
        clearInterval(this.tm);
        this.hideImage = false;
    }

    addDevice() {
        this.navCtrl.push('DevicePage');
    }

    showToast(msg) {
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 3000
        });
        toast.present();
    }

    showLoader() {
        this.loader = this.loadingCtrl.create({
            content: "Obteniendo datos...",
            enableBackdropDismiss: false
        });
        this.loader.present();
    }

}
