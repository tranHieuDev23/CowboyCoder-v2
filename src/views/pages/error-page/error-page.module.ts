import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorPageComponent } from './error-page.component';
import { ErrorPageRoutingModule } from './error-page-routing.module';
import { SharedModule } from 'src/views/shared-module/shared-module.module';



@NgModule({
  declarations: [ErrorPageComponent],
  imports: [
    CommonModule,
    ErrorPageRoutingModule,
    SharedModule
  ]
})
export class ErrorPageModule { }
