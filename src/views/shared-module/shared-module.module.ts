import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PostExcerptPreviewComponent } from './components/post-excerpt-preview/post-excerpt-preview.component';
import { FullNamePipe } from './pipes/full-name/full-name.pipe';
import { SafeHtmlPipe } from '../app/pipes/safe-html/safe-html.pipe';
import { LoadingScreenComponent } from '../app/components/loading-screen/loading-screen.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { BioBoxComponent } from './components/bio-box/bio-box.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule
  ],
  declarations: [
    PostExcerptPreviewComponent,
    LoadingScreenComponent,
    FullNamePipe,
    SafeHtmlPipe,
    SideBarComponent,
    BioBoxComponent
  ],
  exports: [
    PostExcerptPreviewComponent,
    LoadingScreenComponent,
    FullNamePipe,
    SafeHtmlPipe,
    SideBarComponent,
    BioBoxComponent
  ]
})
export class SharedModule { }
