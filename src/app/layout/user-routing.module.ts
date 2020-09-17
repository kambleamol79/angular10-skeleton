import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubjectsComponent } from './components/subjects/subjects.component';
import { TimezoneComponent } from './components/timezone/timezone.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
    {
        path: '', component: DashboardComponent
    },
    {
      path: 'timezone', component: TimezoneComponent
    },
    {
      path: 'subjects', component: SubjectsComponent
    },
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })

  export class UserRoutingModule { }