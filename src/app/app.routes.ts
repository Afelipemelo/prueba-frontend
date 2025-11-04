import { Routes } from '@angular/router';
import { HomePageComponent } from './shared/page/home-page/home-page';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'product',
    loadChildren: () => import('./products/product.routes'),
  },

  {
    path: '**',
    redirectTo: '',
  },
];
