import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    {
        path: 'login',
        loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
    },

    {
        path: 'login/:prefix',
        loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
    },
    {
        path: 'register',
        loadChildren: () => import('./registration/registration.module').then(m => m.RegistrationModule),
    },
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'dashboard',
                loadChildren: () => import('./shared/dashboard/dashboard.module').then(m => m.DashboardModule),
                data: {
                    // roles: ['TENANT_ADMIN', 'STUDENT', 'PARENT', 'FACULTY'],
                },
                // canActivate: [UserRouteAccessService]
            },
        ]

    },

];
