import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArchivePageComponent } from './archive-page.component';


const routes: Routes = [
  {path: ':type/:slug', component: ArchivePageComponent},
  {path: ':type/:slug/:page', component: ArchivePageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArchivePageRoutingModule { }
