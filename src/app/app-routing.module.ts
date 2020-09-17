import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './_helpers';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./layout/user-routing.module').then(m => m.UserRoutingModule),
    canActivate: [AuthGuard]
  
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth-routing.module').then(m => m.AuthRoutingModule)
  },
   // otherwise redirect to home
   { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
