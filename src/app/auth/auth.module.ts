import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SigninComponent } from '../auth/signin/signin.component';
import { SignupComponent } from '../auth/signup/signup.component';
import { LayoutComponent } from './layout/layout.component';
import { AlertComponent } from '../_component/alert/alert.component';
import { AuthService, AlertService, ApiService } from '../_services';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AuthRoutingModule
    ],
    declarations: [
      SigninComponent,
      SignupComponent,
      LayoutComponent,
      AlertComponent
      
    ], 
    providers: [ AuthService, AlertService, ApiService ]
})
export class AuthModule { }
