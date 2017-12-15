import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController, MenuController } from 'ionic-angular';
import { ProcedureProvider } from '../../providers/procedure/procedure';

@IonicPage()
@Component({
    selector: 'page-procedure',
    templateUrl: 'procedure.html',
})
export class ProcedurePage {

    loader:any;
    json = {
        players_id: '', identidad: '',
        detalle: '', indicada: '', realizada: ''
    }
    constructor(
        public menuCtrl: MenuController,
        public toastCtrl: ToastController,
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController,
        public procedureService: ProcedureProvider,
        public navCtrl: NavController,
        public navParams: NavParams
    ) {
        this.menuCtrl.enable(true, 'menuSlide');
    }

    ionViewDidLoad() {
        this.json.players_id = localStorage.getItem('players_id');
        this.json.identidad = localStorage.getItem('identidad');
    }

    sendProcedure() {
        let confirm = this.alertCtrl.create({
            title: '',
            message: '¿Es correcta la información a registrar?',
            buttons: [
                {
                    text: 'Cancelar',
                    handler: () => { }
                },
                {
                    text: 'Aceptar',
                    handler: () => {
                        this.showLoader();
                        this.procedureService.sendProcedure(this.json).then((response) => {
                            this.loader.dismiss();
                            this.showToast('El procedimiento fue registrado exitosamente');
                            this.navCtrl.pop();
                        }).catch((err)=>{
                            this.loader.dismiss();
                            this.showToast('Ups!, ocurrio un error');
                        });
                    }
                }
            ]
        });
        confirm.present();
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
            content: "Enviando datos...",
            enableBackdropDismiss: false
        });
        this.loader.present();
    }
}
