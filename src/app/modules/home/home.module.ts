import { Component, NgModule } from '@angular/core';
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
import { DetailJobComponent } from './detail-job/detail-job.component';
import { DiaglogFormComponent } from './job/diaglog-form/diaglog-form.component';
import {MatDialogModule} from '@angular/material/dialog';
import { ToastrModule } from 'ngx-toastr';
import{MaterialModule} from '../../shared/material.module';
import { ListJeComponent } from './list-je/list-je.component';
import { ChangethePasswordComponent } from './change-the-password/change-the-password.component';
import{StatisticalComponent} from '../../modules/home/statistical/statistical.component';
import { DiaglogUpdateComponent } from './detail-job/diaglog-update/diaglog-update.component';
import { DialogRejectComponent } from './detail-job/dialog-reject/dialog-reject.component';
import { JobsRegisterComponent } from './jobs-register/jobs-register.component';
import { DetailJobregisComponent } from './jobs-register/detail-jobregis/detail-jobregis.component';
import { CompanyComponent } from './company/company.component';
import { DialogreasonComponent } from './jobs-register/detail-jobregis/dialogreason/dialogreason.component';
import { DialogInterveiwComponent } from './jobs-register/detail-jobregis/dialog-interveiw/dialog-interveiw.component';
import { ExportPdfComponent } from './job/export-pdf/export-pdf.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';




const routes: Routes = [{
  path: '',
  component: HomeComponent,
  children: [
    {
      path: '',
      component: StatisticalComponent,
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
      component: ListJeComponent,
    },
    {
      path: 'change-the-password',
      component: ChangethePasswordComponent,
    },
    {
      path: 'job/add',
      component: DiaglogFormComponent,
    },
    {
      path: 'job-register',
      component: JobsRegisterComponent,
    },
    {
      path:'job-register/detail/:id',
      component:DetailJobregisComponent
    },
    {
      path:'company',
      component: CompanyComponent
    },
    {
      path: 'job/update',
      component: DiaglogUpdateComponent,
    },
    {
      path: 'job-pdf/export/:id',
      component: ExportPdfComponent,
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
    ChangethePasswordComponent,
    ListJeComponent,
    DiaglogUpdateComponent,
    DialogRejectComponent,
    JobsRegisterComponent,
    DetailJobregisComponent,
    CompanyComponent,
    DialogreasonComponent,
    DialogInterveiwComponent,
    ExportPdfComponent,
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
    MatTableModule,
    MatPaginatorModule,
  ],
})
export class HomeModule {}
