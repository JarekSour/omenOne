import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, MenuController, Events } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-modal-tratamiento',
    templateUrl: 'modal-tratamiento.html',
})
export class ModalTratamientoPage {

    json = { Protocolo: '', Rama: '', FechaInicio: '', FechaTermino: '', TratamientoCompleto: '' }

    constructor(
        public event: Events,
        public menuCtrl: MenuController,
        public viewCtrl: ViewController,
        public navCtrl: NavController,
        public navParams: NavParams
    ) {
        this.menuCtrl.enable(true, 'menuSlide');
    }

    ionViewDidLoad() {

    }

    addTratamiento() {
        this.event.publish('updateTratamientos', this.json);
        this.viewCtrl.dismiss();
    }

    closeModal() {
        this.viewCtrl.dismiss();
    }

}
