import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TagsListPageComponent } from './tags-list-page.component';


const routes: Routes = [
  { path: '', component: TagsListPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TagsListPageRoutingModule { }
