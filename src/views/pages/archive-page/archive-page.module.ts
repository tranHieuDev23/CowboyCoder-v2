import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArchivePageRoutingModule } from './archive-page-routing.module';
import { ArchivePageComponent } from './archive-page.component';
import { SharedModule } from '../../shared-module/shared-module.module';
import { AddPipe } from './pipes/add/add.pipe';
import { PaginationComponent } from './components/pagination/pagination.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    ArchivePageComponent,
    PaginationComponent,
    AddPipe
  ],
  imports: [
    CommonModule,
    ArchivePageRoutingModule,
    SharedModule,
    FontAwesomeModule
  ]
})
export class ArchivePageModule { }
