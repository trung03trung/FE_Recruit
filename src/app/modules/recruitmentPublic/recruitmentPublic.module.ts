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
import { RecruitmentPublicComponent } from './recruitmentPublic.component';
import { ProfileUserPComponent } from './profileUserP/profileUserP.component';
const routes: Routes = [{
  path: '',
  component: RecruitmentPublicComponent,
  children: [
    {
      path: 'profile-public',
      component: ProfileUserPComponent,
    },
  ],
}];

@NgModule({
  declarations: [
    RecruitmentPublicComponent,
    ProfileUserPComponent
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
