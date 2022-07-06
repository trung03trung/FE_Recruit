import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import { ForgotPasswordComponent } from './forgot-password.component';
import{MaterialModule} from '../shared/material.module';

const routes: Routes = [{
  path: '',
  component: ForgotPasswordComponent,
  children: [],
}];

@NgModule({
  declarations: [
    ForgotPasswordComponent,
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
export class ForgotPasswordModule { }
