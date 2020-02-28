import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './pages/tabs/tabs.module#TabsPageModule' },
  {
    path: 'show/:id',
    loadChildren: () => import('./pages/show/show.module').then( m => m.ShowPageModule)
  },
  {
    path: 'show',
    loadChildren: () => import('./pages/show/show.module').then( m => m.ShowPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
