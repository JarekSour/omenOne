import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { HttpModule } from '@angular/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NativeAudio } from '@ionic-native/native-audio';
import { MediaCapture } from '@ionic-native/media-capture';
import { Camera } from '@ionic-native/camera';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Facebook } from '@ionic-native/facebook';
import { BLE } from '@ionic-native/ble';
import { Keyboard } from '@ionic-native/keyboard';

import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
const config: SocketIoConfig = { url: 'https://middle.mybluemix.net', options: {} };

import { MainProvider } from '../providers/main/main';
import { FileProvider } from '../providers/file/file';
import { CommentProvider } from '../providers/comment/comment';
import { PersonProvider } from '../providers/person/person';
import { SignalProvider } from '../providers/signal/signal';
import { ProcedureProvider } from '../providers/procedure/procedure';
import { ClinicProvider } from '../providers/clinic/clinic';

@NgModule({
    declarations: [
        MyApp
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        HttpModule,
        SocketIoModule.forRoot(config)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp
    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        MainProvider,
        NativeAudio,
        MediaCapture,
        Camera,
        FileProvider,
        FileTransfer,
        File,
        CommentProvider,
        PersonProvider,
        Facebook,
        BLE,
        SignalProvider,
        ProcedureProvider,
        ClinicProvider,
        Keyboard
    ]
})
export class AppModule { }
