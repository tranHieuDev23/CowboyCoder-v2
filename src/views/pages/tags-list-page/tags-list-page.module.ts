import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagsListPageComponent } from './tags-list-page.component';
import { TagsListPageRoutingModule } from './tags-list-page-routing.module';
import { SharedModule } from '../../shared-module/shared-module.module';



@NgModule({
  declarations: [TagsListPageComponent],
  imports: [
    CommonModule,
    TagsListPageRoutingModule,
    SharedModule
  ]
})
export class TagsListPageModule { }
