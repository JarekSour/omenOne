import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileProvider } from '../../providers/file/file';

@IonicPage()
@Component({
    selector: 'page-imagen',
    templateUrl: 'imagen.html',
})
export class ImagenPage {

    loader: any;

    constructor(
        public toastCtrl: ToastController,
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController,
        public fileService: FileProvider,
        public camera: Camera,
        public menuCtrl: MenuController,
        public navCtrl: NavController,
        public navParams: NavParams) {
        this.menuCtrl.enable(false, 'menuSlide');
    }

    ionViewDidLoad() {
    }

    captureImage() {
        const options: CameraOptions = {
            quality: 75,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            correctOrientation: true
        }

        this.camera.getPicture(options).then((imageData) => {
            this.showLoader();
            this.fileService.uploadFile(imageData).then((response) => {
                console.log(JSON.stringify(response));
                this.loader.dismiss();
                this.showToast('La imagen fue enviada exitosamente.');
            }).catch((err) => {
                this.showToast('Ups! ocurrio un error, reintenta nuevamente.');
            });
        }, (err) => {
            this.showToast(err);
            this.loader.dismiss();
        });
    }

    showLoader() {
        this.loader = this.loadingCtrl.create({
            content: "Enviando imagen...",
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
