import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File, FileEntry } from '@ionic-native/file';

@Injectable()
export class FileProvider {

    constructor(
        private transfer: FileTransfer,
        public http: Http,
        public file: File
    ) { }

    uploadFile(image) {
        return new Promise((resolve, reject) => {
            this.file.resolveLocalFilesystemUrl(image)
                .then(entry => (<FileEntry>entry).file(file => {

                    const reader = new FileReader();
                    reader.onloadend = () => {
                        const imgBlob = new Blob([reader.result], { type: file.type });

                        const formData = new FormData();
                        formData.append('files', imgBlob, file.name);
                        formData.append("identidad", localStorage.getItem('identidad'));
                        formData.append("players_id", localStorage.getItem('players_id'));

                        this.http.post("http://middle.mybluemix.net/archivo/set", formData)
                            .subscribe(res => {
                                resolve(res.json());
                            }, (err) => {
                                reject(err);
                            });
                    };
                    reader.readAsArrayBuffer(file);
                }))
                .catch(err => resolve(err));
        });
    }

}
