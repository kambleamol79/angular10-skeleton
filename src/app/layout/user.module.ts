import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ContentComponent } from './content/content.component';
import { TimezoneComponent } from './components/timezone/timezone.component';
import { SubjectsComponent } from './components/subjects/subjects.component';
import { AuthService, AlertService, ApiService } from '../_services';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        UserRoutingModule
    ],
    declarations: [
      ContentComponent,
      TimezoneComponent,
      SubjectsComponent
    ],
    providers: [ AuthService, AlertService, ApiService ]
})
export class UserModule { }
