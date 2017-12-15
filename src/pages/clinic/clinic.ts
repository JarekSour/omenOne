import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, MenuController, Events, ToastController, LoadingController } from 'ionic-angular';
import { ClinicProvider } from '../../providers/clinic/clinic';

@IonicPage()
@Component({
    selector: 'page-clinic',
    templateUrl: 'clinic.html',
})
export class ClinicPage {

    json = {
        players_id: '', identidad: '',
        Diagnostico: '', Histologico: '', Item: { Titulo: '', Contenido: '' }, PatologiasAsociadas: '',
        FechaDiagnostico: '', EdadPaciente: '', FechaTratamiento: '', OcupacionPaciente: '', ComentarioAlta: '',
        HistorialFamiliar: [], Tratamiento: []
    }
    historialFamiliar = [];
    tratamiento = [];
    loader:any;

    constructor(
        public toastCtrl: ToastController,
        public loadingCtrl: LoadingController,
        public event: Events,
        public menuCtrl: MenuController,
        public modalCtrl: ModalController,
        public clinicService: ClinicProvider,
        public alertCtrl: AlertController,
        public navCtrl: NavController,
        public navParams: NavParams) {
            this.menuCtrl.enable(true, 'menuSlide');
    }

    ionViewDidLoad() {
        this.json.players_id = localStorage.getItem('players_id');
        this.json.identidad = localStorage.getItem('identidad');

        this.event.subscribe('updateTratamientos', (tratamientos) => {
            this.json.Tratamiento.push(tratamientos);
        });

        let confirm = this.alertCtrl.create({
            title: 'Alerta!',
            message: 'Al llenar los datos de esta vista asegura que estos son verídicos y pueden ser vistos por un especialista médico, ¿desea continuar?',
            buttons: [
                {
                    text: 'Volver',
                    handler: () => {
                        this.navCtrl.pop();
                    }
                },
                {
                    text: 'Continuar',
                    handler: () => {
                    }
                }
            ]
        });
        confirm.present();
    }

    sendClinic() {
        let confirm = this.alertCtrl.create({
            title: 'Alerta!',
            message: '¿Esta a punto de guarda estos datos clínicos los cuales serán ineditables?',
            buttons: [
                {
                    text: 'Cancelar',
                    handler: () => {
                        this.navCtrl.pop();
                    }
                },
                {
                    text: 'Aceptar',
                    handler: () => {
                        this.showLoader();
                        for (let familiar of this.historialFamiliar)
                            this.json.HistorialFamiliar.push({ Familiar: familiar });

                        this.clinicService.sendClinic(this.json).then((response)=>{
                            this.loader.dismiss();
                            this.showToast('Los datos clínicos fueron enviados exitosamente');
                        }).catch((err)=>{
                            this.loader.dismiss();
                            this.showToast('Ups! ocurrió un error');
                        })
                    }
                }
            ]
        });
        confirm.present();
    }

    addTratamiento(){
        let modal = this.modalCtrl.create('ModalTratamientoPage');
        modal.present();
    }

    showLoader() {
        this.loader = this.loadingCtrl.create({
            content: "Enviando datos...",
            enableBackdropDismiss:false
        });
        this.loader.present();
    }

    showToast(msg){
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 3000
        });
        toast.present();
    }

}
