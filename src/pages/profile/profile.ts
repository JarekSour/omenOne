import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events, LoadingController, ToastController, MenuController } from 'ionic-angular';
import { PersonProvider } from '../../providers/person/person';
import { Facebook } from '@ionic-native/facebook';

@IonicPage()
@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html',
})
export class ProfilePage {

    identidad = localStorage.getItem('identidad');
    players_id = localStorage.getItem('players_id');
    userProfile = { photoURL: '', displayName: '', email: '' };
    modal: any;
    estaticos = { Nacimiento: '', Sexo: '', Nacionalidad: '', Origen: '', TipoSangre: '' }
    variables = { Estatura: '', Peso: '', Tratamiento: '', Alergia: '', Fuma: '', Bebe: '', Pais: '', Ciudad: '', Comuna: '' };
    loader: any;

    constructor(
        public fb: Facebook,
        public event: Events,
        public loadingCtrl: LoadingController,
        public toastCtrl: ToastController,
        public personService: PersonProvider,
        public modalCtrl: ModalController,
        public navCtrl: NavController,
        public menuCtrl: MenuController,
        public navParams: NavParams
    ) {
        this.menuCtrl.enable(false, 'menuSlide');
        this.event.subscribe('updatePerfil', () => {
            this.getData();
        });
    }

    ionViewDidLoad() {
        this.showLoader();
        this.fb.api('/' + localStorage.getItem('idFacebook') + '?fields=id,name,gender,email', []).then((response) => {
            this.userProfile.photoURL = "https://graph.facebook.com/" + response["id"] + "/picture?type=large";
            this.userProfile.displayName = response["name"];
            this.userProfile.email = response["email"];
        });
        this.getData();
    }

    getData(){
        this.personService.getStaticData({ identidad: this.identidad, players_id: this.players_id }).then((response) => {
            if (response["data"] != false) {
                console.log(JSON.stringify(response))
                this.estaticos.Nacimiento = response['data']['Nacimiento'].split('T')[0];
                this.estaticos.Sexo = response['data']['Sexo'] == 'Femenino' ? 'Femenino' : 'Masculino';
                this.estaticos.Nacionalidad = response['data']['Nacionalidad'];
                this.estaticos.Origen = response['data']['Origen'];
                this.estaticos.TipoSangre = response['data']['TipoSangre'];

                this.personService.getVariableData({ identidad: localStorage.getItem('identidad'), players_id: localStorage.getItem('players_id') }).then((res) => {
                    console.log(JSON.stringify(res))
                    if (res['data'] != false) {
                        this.variables.Fuma = res['data']['Fuma'] ? "true" : "false";
                        this.variables.Bebe = res['data']['Bebe'] ? "true" : "false";
                        this.variables.Estatura = res['data']['Estatura'];
                        this.variables.Peso = res['data']['Peso'];
                        this.variables.Tratamiento = res['data']['Tratamiento'];
                        this.variables.Alergia = res['data']['Alergia'];
                        this.variables.Pais = res['data']['Pais'];
                        this.variables.Ciudad = res['data']['Ciudad'];
                        this.variables.Comuna = res['data']['Comuna'];
                    }else{
                        this.variables.Estatura = '0';
                        this.variables.Peso =  '0';
                    }
                    this.loader.dismiss();
                });
            }
        });
    }

    editParam(param) {
        this.modal = this.modalCtrl.create('ParamProfilePage', { tipo: param, data: this.variables });
        this.modal.present();
    }

    showLoader() {
        this.loader = this.loadingCtrl.create({
            content: "Obteniendo datos...",
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
