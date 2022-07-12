import {SignupComponent} from "./modules/signup/signup.component";
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import {ActiveAccountComponent} from "./modules/signup/active-account/active-account.component";
import { ExtraOptions, RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { AuthGuard } from "./@core/guards/auth.guard";

export const routes: Routes = [
  {
    path: "home",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./modules/home/home.module").then((m) => m.HomeModule),
  },
  {
    path: "auth",
    loadChildren: () =>
      import("./modules/auth/auth.module").then((m) => m.AuthModule),
  },
  // { path: '',
  //   redirectTo: 'home',
  //   pathMatch: 'full',
  // },
  // { path: '**',
  //   redirectTo: 'home',
  // },
  {
    path: "forgot-password",
    loadChildren: () =>
      import("./forgot-password/forgot-password.module").then(
        (m) => m.ForgotPasswordModule
      ),
  },
  {
    path:'change-password',
      loadChildren: () => import('./forgot-password/change-password/change-password.module').then(m => m.ChangePasswordModule),
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'active',
    component: ActiveAccountComponent,
  }

];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
