import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./feature/dashboard/dashboard.component').then(m => m.DashboardComponent)
    },
    {
        path: 'products',
        loadComponent: () => import('./feature/products/products.component').then(m => m.ProductsComponent)
    },
    {
        path: '**',
        redirectTo: ''
    }
];
