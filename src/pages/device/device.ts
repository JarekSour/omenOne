import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, MenuController } from 'ionic-angular';
import { SignalProvider } from '../../providers/signal/signal'
import { BLE } from '@ionic-native/ble';

@IonicPage()
@Component({
    selector: 'page-device',
    templateUrl: 'device.html',
})
export class DevicePage {

    _button: any;
    _name: any;
    loading: any;
    devices: any;
    peripheral: any;
    okay: any;
    _data: any;

    constructor(
        public menuCtrl: MenuController,
        public signalService: SignalProvider,
        public toastCtrl: ToastController,
        public loadingCtrl: LoadingController,
        public ble: BLE,
        public navCtrl: NavController,
        public navParams: NavParams) {
            this.menuCtrl.enable(true, 'menuSlide');
        this.devices = [];
    }

    ionViewDidLoad() {

    }

    statusBluetooth() {
        this.ble.isEnabled().then(() => {
            this.scan();
        }, (err) => {
            this.ble.enable().then(() => {
                this.scan();
            }, () => {
                let toast = this.toastCtrl.create({
                    message: 'Debe activar el Blueetooth para usar Careband',
                    duration: 4000,
                    position: 'bottom'
                });

                toast.present(toast);
            });
        });
    }

    scan() {
        this.loading = this.loadingCtrl.create({
            content: 'Buscando dispositivo...'
        });
        this.loading.present();

        this.ble.startScan([]).subscribe(device => {
            this.devices.push(device);
            this.loading.dismiss()
            this.stopScan();
        }, (err) => {
            console.log(err)
        });
    }

    stopScan() {
        this.ble.stopScan().then(() => {
            this._name = this.devices[0].name;
            localStorage.setItem('nameDevice', this.devices[0].name);
            localStorage.setItem('idDevice', this.devices[0].id);
            this._button = true;
            this.connect();
        });
    }

    connect() {
        console.log("conectar");
        this.peripheral = true;
        this.ble.connect(localStorage.getItem('idDevice')).subscribe(peripheralData => {
            console.log("ocultar");
            this.peripheral = false;
            this.okay = true;
            this.getData();
        }, (err) => {
            console.log(JSON.stringify(err) + '--------')
            this._button = null;
            this._name = null;
            this._data = null;
            this.peripheral = null;
            this.okay = null;
            let toast = this.toastCtrl.create({
                message: 'El dispositivo no se encuentra conectado',
                duration: 4000,
                position: 'bottom'
            });
            toast.present(toast);
        });
    }

    getData() {
        console.log("obteniendo data")
        this.ble.startNotification(localStorage.getItem('idDevice'), 'FFE0', 'FFE1').subscribe(info => {
            var json = JSON.parse(this.bytesToString(info));
            console.log(JSON.stringify(json));
            console.log(JSON.stringify({ identidad: localStorage.getItem('identidad'), players_id: localStorage.getItem('players_id'), dispositivo: localStorage.getItem('nameDevice'), valor: json.t, metodo:'Extremidad' }));

            if (json.t > 0)
                this.signalService.updateTemperatura({ identidad: localStorage.getItem('identidad'), players_id: localStorage.getItem('players_id'), dispositivo: localStorage.getItem('nameDevice'), valor: json.t, metodo:'Extremidad' }).then((response) => {
                    console.log(JSON.stringify(response));
                });

            if (json.S > 0)
                this.signalService.updateOxigenacion({ identidad: localStorage.getItem('identidad'), players_id: localStorage.getItem('players_id'), dispositivo: localStorage.getItem('nameDevice'), valor: json.S }).then((response) => {
                    console.log(JSON.stringify(response));
                });
        });
    }

    bytesToString(buffer) {
        return String.fromCharCode.apply(null, new Uint8Array(buffer));
    }

    disconnect() {
        this.ble.disconnect(localStorage.getItem('idDevice')).then(() => {
            localStorage.removeItem('idDevice');
            localStorage.removeItem('nameDevice');
            this._button = null;
            this._name = null;
            this._data = null;
            this.peripheral = null;
            this.okay = null;
        });
    }

}
