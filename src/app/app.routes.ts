import { Routes } from '@angular/router';
import { inject } from '@angular/core';

import { AuthComponent } from './core/auth/auth.component';
import { HomeComponent } from './features/article/routes/home/home.component';
import { ArticleComponent } from './features/article/routes/article/article.component';
import { UserService } from './core/services/user.service';
import { ProfileComponent } from './features/profile/routes/profile/profile.component';
import { SettingsComponent } from './features/profile/routes/settings/settings.component';
import { map } from 'rxjs';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: AuthComponent },
  { path: 'register', component: AuthComponent },
  {
    path: 'article/:slug',
    component: ArticleComponent,
    canActivate: [
      () => inject(UserService).isAuthenticated.pipe(map((isAuth) => isAuth)),
    ],
  },
  {
    path: 'profile',
    children: [
      {
        path: 'settings',
        component: SettingsComponent,
        canActivate: [
          () =>
            inject(UserService).isAuthenticated.pipe(map((isAuth) => isAuth)),
        ],
      },
      { path: ':username', component: ProfileComponent },
    ],
  },
];
