import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutPageComponent } from './about-page.component';
import { AboutPageRoutingModule } from './about-page-routing.module';
import { SharedModule } from '../../shared-module/shared-module.module';



@NgModule({
  declarations: [AboutPageComponent],
  imports: [
    CommonModule,
    AboutPageRoutingModule,
    SharedModule
  ]
})
export class AboutPageModule { }
