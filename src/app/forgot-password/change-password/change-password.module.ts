import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import { ChangePasswordComponent } from './change-password.component';
import {ErrorStateMatcher} from '@angular/material/core';
import{MaterialModule} from '../../shared/material.module'

const routes: Routes = [{
  path: '',
  component: ChangePasswordComponent,
  children: [],
}];

@NgModule({
  providers: [
    {provide: ErrorStateMatcher}
  ],
  declarations: [
    ChangePasswordComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
   
  ]
})
export class ChangePasswordModule { }
