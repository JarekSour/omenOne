import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ToastController, AlertController, LoadingController } from 'ionic-angular';
import { NativeAudio } from '@ionic-native/native-audio';
import { MediaCapture, MediaFile, CaptureError } from '@ionic-native/media-capture';
import { FileProvider } from '../../providers/file/file'


@IonicPage()
@Component({
    selector: 'page-audio',
    templateUrl: 'audio.html',
})
export class AudioPage {

    loader:any;

    constructor(
        public loadingCtrl: LoadingController,
        public fileService: FileProvider,
        public alertCtrl: AlertController,
        public mediaCapture: MediaCapture,
        public toastCtrl: ToastController,
        public nativeAudio: NativeAudio,
        public menuCtrl: MenuController,
        public navCtrl: NavController,
        public navParams: NavParams) {

        this.menuCtrl.enable(false, 'menuSlide');
    }

    ionViewDidLoad() {

    }

    captureAudio() {
        this.nativeAudio.preloadSimple('uniqueId1', 'assets/sounds/alert.mp3').then(() => {
            this.playShow();
        }, () => {
            this.playShow();
        });
    }

    playShow() {
        this.nativeAudio.play('uniqueId1', () => {
            this.mediaCapture.captureAudio()
                .then(
                (data: MediaFile[]) => {
                    this.showLoader();
                    this.fileService.uploadFile(data[0]['localURL']).then((response) => {
                        console.log(JSON.stringify(response));
                        this.loader.dismiss();
                        this.showToast('El audio fue enviado exitosamente.');
                    }).catch((err)=>{
                        this.showToast('Ups! ocurrio un error, reintenta nuevamente.');
                    });
                },
                (err: CaptureError) => {
                    if (parseInt(err['code']) !== 3) {
                        this.showToast('Ups! ocurrio un error, reintenta nuevamente.');
                    }
                }
                );
        });
    }

    showLoader() {
        this.loader = this.loadingCtrl.create({
            content: "Enviando audio...",
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
