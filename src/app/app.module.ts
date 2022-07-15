/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { CoreModule } from "./@core/core.module";
import { ThemeModule } from "./@theme/theme.module";
import { AppComponent } from "./app.component";
import { ToastrModule } from "ngx-toastr";
import { AppRoutingModule } from "./app.routing";
import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from "@nebular/theme";
import { MatTableModule } from "@angular/material/table";
import { SignupComponent } from "./modules/signup/signup.component";
import { TokenInterceptor } from "./@core/services/interceptor.service";
import { ReactiveFormsModule } from "@angular/forms";
import { ActiveAccountComponent } from "./modules/signup/active-account/active-account.component";
import { MatCardModule } from "@angular/material/card";
import { StatisticalComponent } from "./modules/home/statistical/statistical.component";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { ToastNotificationsModule } from "ngx-toast-notifications";
import { MatIconModule } from '@angular/material/icon'
import { DetaileJobPComponent } from "./modules/recruitmentPublic/detalJob/detailJob.component";

const configToast: any = {
  timeOut: 3000,
  positionClass: "toast-top-right",
  preventDuplicates: true,
  progressBar: true,
  progressAnimation: "increasing",
};

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    ActiveAccountComponent,
    StatisticalComponent,
    DetaileJobPComponent,
  ],
  imports: [
    BrowserModule,
    MatCardModule,
    NgxChartsModule,
    BrowserModule,
    MatTableModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: "AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY",
    }),
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
    ToastrModule.forRoot(configToast),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastNotificationsModule,
    MatIconModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
})
export class AppModule {}
