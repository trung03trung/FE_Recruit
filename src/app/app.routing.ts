import {SignupComponent} from "./modules/signup/signup.component";
import {ActiveAccountComponent} from "./modules/signup/active-account/active-account.component";
import { ExtraOptions, RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { AuthGuard } from "./@core/guards/auth.guard";
import { ProfileUserPublicComponent } from "./modules/recruitmentPublic/profile-user-public/profile-user-public.component";
import { DetaileJobPComponent } from "./modules/recruitmentPublic/detal-job-public/detail-job-public.component";
import { PopupApply } from "./modules/recruitmentPublic/popup-apply/popup-apply.component";
import { ChangeThePasswordPublicComponent } from "./modules/recruitmentPublic/change-the-password-public/change-the-password-public.component";
import { JobListingComponent } from "./modules/recruitmentPublic/job-listing/job-listing.component";


export const routes: Routes = [
  {
    path: "home",
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
    path: 'profile-public',
    component: ProfileUserPublicComponent,
  },
  {
    path:'public-job/detail/:id',
    component: DetaileJobPComponent,
  },
  {
    path: 'active',
    component: ActiveAccountComponent,
  },
  {
    path: '',
    loadChildren: () =>
    import("./modules/recruitmentPublic/recruitment-public.module").then((m) => m.RecruitmentPublicModule),
  },
  {
    path: 'public-job/apply/:id',
    component: PopupApply ,
  },
  {
    path: 'change-the-password-public',
    component: ChangeThePasswordPublicComponent ,
  },
  {
    path:'public-job/job-list/:keyword',
    component: JobListingComponent,
  },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
