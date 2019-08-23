import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page.component';
import { HomePageRoutingModule } from './home-page-routing.module';
import { SharedModule } from '../../shared-module/shared-module.module';
import { PostImagePreviewComponent } from './components/post-image-preview/post-image-preview.component';



@NgModule({
  declarations: [HomePageComponent, PostImagePreviewComponent],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    SharedModule
  ]
})
export class HomePageModule { }
