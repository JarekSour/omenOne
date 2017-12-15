import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ToastController, Events, MenuController } from 'ionic-angular';
import { PersonProvider } from '../../providers/person/person';

@IonicPage()
@Component({
    selector: 'page-param-profile',
    templateUrl: 'param-profile.html',
})
export class ParamProfilePage {

    identidad = localStorage.getItem('identidad');
    players_id = localStorage.getItem('players_id');
    tipo = this.navParams.get('tipo');
    data = this.navParams.get('data');
    isEstatura: boolean;
    isPeso: boolean;
    isTratamiento: boolean;
    isAlergia: boolean;
    isFuma: boolean;
    isBebe: boolean;
    isPais: boolean;
    isCiudad: boolean;
    isComuna: boolean;
    label: any;
    loader: any;
    json = {
        players_id: this.players_id, identidad: this.identidad, Estatura: this.data.Estatura, Peso: this.data.Peso, Tratamiento: this.data.Tratamiento, Alergia: this.data.Alergia,
        Fuma: this.data.Fuma, Bebe: this.data.Bebe, Pais: this.data.Pais, Ciudad: this.data.Ciudad, Comuna: this.data.Comuna
    }
    auxJson: any;

    constructor(
        public event: Events,
        public loadingCtrl: LoadingController,
        public toastCtrl: ToastController,
        public personService: PersonProvider,
        public viewCtrl: ViewController,
        public navCtrl: NavController,
        public menuCtrl: MenuController,
        public navParams: NavParams) {
        this.menuCtrl.enable(false, 'menuSlide');
    }

    ionViewDidLoad() {
        switch (this.tipo) {
            case 'estatura':
                this.isEstatura = true;
                this.label = 'Estatura';
                break;
            case 'peso':
                this.isPeso = true;
                this.label = 'Peso';
                break;
            case 'tratamiento':
                this.isTratamiento = true;
                this.label = 'Tratamientos';
                break;
            case 'alergia':
                this.isAlergia = true;
                this.label = 'Alergias';
                break;
            case 'fuma':
                this.isFuma = true;
                this.label = 'Fuma';
                break;
            case 'bebe':
                this.isBebe = true;
                this.label = 'Bebe';
                break;
            case 'pais':
                this.isPais = true;
                this.label = 'País';
                break;
            case 'ciudad':
                this.isCiudad = true;
                this.label = 'Ciudad';
                break;
            case 'comuna':
                this.isComuna = true;
                this.label = 'Comuna';
                break;

            default: break;
        }
    }

    updateVariable() {
        this.json.Fuma = this.json.Fuma == "true" ? true : false;
        this.json.Bebe = this.json.Bebe == "true" ? true : false;

        this.showLoader();
        console.log(JSON.stringify(this.json));
        this.personService.updateVariableData(this.json).then((response) => {
            console.log(JSON.stringify(response) + "-------------")
            this.loader.dismiss();
            this.event.publish('updatePerfil');
            this.viewCtrl.dismiss();
        });
    }

    showLoader() {
        this.loader = this.loadingCtrl.create({
            content: "Actualizando datos...",
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

    closeModal() {
        this.viewCtrl.dismiss();
    }

}
