import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImagenPage } from './imagen';

@NgModule({
  declarations: [
    ImagenPage,
  ],
  imports: [
    IonicPageModule.forChild(ImagenPage),
  ],
})
export class ImagenPageModule {}
