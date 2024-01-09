import { Routes } from '@angular/router';
import { AuthComponent } from './core/auth/auth.component';
import { HomeComponent } from './features/article/routes/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: AuthComponent },
  { path: 'register', component: AuthComponent },
];
