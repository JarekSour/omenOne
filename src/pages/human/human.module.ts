import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HumanPage } from './human';

@NgModule({
  declarations: [
    HumanPage,
  ],
  imports: [
    IonicPageModule.forChild(HumanPage),
  ],
})
export class HumanPageModule {}
