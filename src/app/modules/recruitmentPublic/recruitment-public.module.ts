import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NbMenuModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { SharedModule } from 'primeng/api';
import { PrimengModule } from '../../shared/primeng.module';
import { ReactiveFormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import { ToastrModule } from 'ngx-toastr';
import{MaterialModule} from '../../shared/material.module';
import { RecruitmentPublicComponent } from './recruitment-public.component';
import { ProfileUserPublicComponent } from './profile-user-public/profile-user-public.component';
import { HeaderPublicComponent } from '../header-public/header-public.component';
import { DetaileJobPComponent } from './detal-job-public/detail-job-public.component';
import { JobListingComponent } from './job-listing/job-listing.component';

const routes: Routes = [{
  path: '',
  component: RecruitmentPublicComponent,
  children: [
    // {
    //   path: 'profile-public',
    //   component: ProfileUserPublicComponent,
    // },
  ],
}];

@NgModule({
  declarations: [
    RecruitmentPublicComponent,
    ProfileUserPublicComponent,
    DetaileJobPComponent,
    HeaderPublicComponent,
    JobListingComponent
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
    MaterialModule,
  ],
})
export class RecruitmentPublicModule {}
