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
            // {
            //     path: 'home',
            //     loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
            //     data: {
            //         // roles: ['TENANT_ADMIN', 'STUDENT', 'PARENT', 'PARENT_ADMISSION', 'FACULTY'],
            //         resource: EntityConstants.SYS_ADMIN_RSRC
            //     },
            //     canActivate: [UserRouteAccessService]
            // },
        ]

    },

];
