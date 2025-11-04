import { Routes } from '@angular/router';
import { ProductsLayoutComponent } from './layout/ProductsLayout/ProductsLayout/ProductsLayout';
import { ProductPageComponent } from './page/product-page/product-page.component';
import { ProductsAllPageComponent } from './page/products-all-page/products-all-page.component';


export const countryRoutes: Routes = [
  {
    path: '',
    component: ProductsLayoutComponent,
    children : [
      {
        path : 'all',
        component : ProductsAllPageComponent
      },
      {
        path : ':id',
        component : ProductPageComponent
      },
      {
        path: '**',
        component: ProductsLayoutComponent,
      },
    ]
  },
   {
    path: '**',
    redirectTo: ''
  },
];

export default countryRoutes;
