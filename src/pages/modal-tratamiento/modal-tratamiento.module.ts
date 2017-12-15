import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalTratamientoPage } from './modal-tratamiento';

@NgModule({
  declarations: [
    ModalTratamientoPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalTratamientoPage),
  ],
})
export class ModalTratamientoPageModule {}
