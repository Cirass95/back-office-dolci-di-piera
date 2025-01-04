import { Routes } from '@angular/router';
import { statisticsResolver } from './feature/statistics/resolver/statistics.resolver';

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
        path: 'stats',
        resolve: {
            categories: statisticsResolver
        },
        loadComponent: () => import('./feature/statistics/statistics.component').then(m => m.StatisticsComponent)
    },
    {
        path: '**',
        redirectTo: ''
    }
];
