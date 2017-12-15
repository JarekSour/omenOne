import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ToastController, LoadingController } from 'ionic-angular';
import { CommentProvider } from '../../providers/comment/comment';

@IonicPage()
@Component({
    selector: 'page-comentario',
    templateUrl: 'comentario.html',
})
export class ComentarioPage {

    loader:any;
    json = { Comentario: '', players_id: localStorage.getItem('players_id'), identidad: localStorage.getItem('identidad') };

    constructor(
        public toastCtrl: ToastController,
        public loadingCtrl: LoadingController,
        public commentService: CommentProvider,
        public menuCtrl: MenuController,
        public navCtrl: NavController,
        public navParams: NavParams) {
        this.menuCtrl.enable(false, 'menuSlide');
    }

    sendComentario() {
        this.showLoader();
        this.commentService.sendComment(this.json).then((response)=>{
            console.log(JSON.stringify(response));
            this.json.Comentario = '';
            this.loader.dismiss();
            this.showToast('Su comentario fue enviado');
        });
    }

    showLoader() {
        this.loader = this.loadingCtrl.create({
            content: "Enviando comentario...",
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
