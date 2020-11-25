import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('../pages/home-page/home-page.module').then(mod => mod.HomePageModule)
  },
  {
    path: 'post',
    loadChildren: () => import('../pages/post-page/post-page.module').then(mod => mod.PostPageModule)
  },
  {
    path: 'archive',
    loadChildren: () => import('../pages/archive-page/archive-page.module').then(mod => mod.ArchivePageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('../pages/search-page/search-page.module').then(mod => mod.SearchPageModule)
  },
  {
    path: 'tags-list',
    loadChildren: () => import('../pages/tags-list-page/tags-list-page.module').then(mod => mod.TagsListPageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('../pages/about-page/about-page.module').then(mod => mod.AboutPageModule)
  },
  {
    path: '**',
    loadChildren: () => import('../pages/error-page/error-page.module').then(mod => mod.ErrorPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy', initialNavigation: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
