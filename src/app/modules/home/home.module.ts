import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { NbMenuModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from 'primeng/api';
import { PrimengModule } from '../../shared/primeng.module';
import { ReactiveFormsModule } from '@angular/forms';
import { JobComponent } from './job/job.component';
import { JobService } from '../../@core/services/job.service';
import { DetailJobComponent } from './detail-job/detail-job.component';
import { DiaglogFormComponent } from './job/diaglog-form/diaglog-form.component';
import {MatDialogModule} from '@angular/material/dialog';
import { ToastrModule } from 'ngx-toastr';
import{MaterialModule} from '../../shared/material.module';
import { ListjeComponent } from './listje/listje.component';
import { ChangethePasswordComponent } from './change-the-password/change-the-password.component';
import { DiaglogUpdateComponent } from './detail-job/diaglog-update/diaglog-update.component';


const routes: Routes = [{
  path: '',
  component: HomeComponent,
  children: [
    {
      path: 'dashboard',
      // loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
    },
    {
      path: 'profile',
      component: ProfileComponent,
    },
    {
      path:'job',
      component:JobComponent
    },
    {
      path:'job/detail/:id',
      component:DetailJobComponent
    },
    {
      path: 'list-je',
      component: ListjeComponent,
    },
    {
      path: 'change-the-password',
      component: ChangethePasswordComponent,
    },
  ],
}];

@NgModule({
  declarations: [
    HomeComponent,
    ProfileComponent,
    JobComponent,
    DetailJobComponent,
    DiaglogFormComponent,
    ListjeComponent,
    DiaglogUpdateComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ThemeModule,
    NbMenuModule,
    ReactiveFormsModule,
    PrimengModule,
    SharedModule,
    MatDialogModule,
    ToastrModule.forRoot(),
    MaterialModule
  ],
})
export class HomeModule { }
