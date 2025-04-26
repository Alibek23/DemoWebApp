import { provideRouter, Routes } from '@angular/router';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductDetailsComponent } from './pages/product-detail/product-detail.component';
import { ProductCreateComponent } from './pages/product-create/product-create.component';
import { MainLayoutComponent } from './shared/layouts/main-layout.component';
import { NotFoundComponent } from './shared/pages/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'products', pathMatch: 'full' },
      { path: 'products', component: ProductListComponent },
      { path: 'products/create', component: ProductCreateComponent },
      { path: 'products/:id', component: ProductDetailsComponent },
    ]
  },
  { path: '**', component: NotFoundComponent }
];

export const appRouter = provideRouter(routes);