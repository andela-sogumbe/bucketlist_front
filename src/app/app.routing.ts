import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ItemsComponent } from './components/items/items.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const appRoutes: Routes = [
    {
        path: '',
        component: LoginComponent,
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'items',
        component: ItemsComponent
    }
]

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);