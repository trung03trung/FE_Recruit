import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from './@core/guards/auth.guard';
import { RegisterComponent } from './modules/register/register.component';
import { ListjeComponent } from './modules/listje/listje.component';

export const routes: Routes = [
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
  },
  // { path: '',
  //   redirectTo: 'home',
  //   pathMatch: 'full',
  // },
  // { path: '**',
  //   redirectTo: 'home',
  // },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'listje',
    component: ListjeComponent,
  }
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
