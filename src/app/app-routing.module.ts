import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {
    path:'login',component:LoginComponent
  },
  {
    path:'',redirectTo:'/login',pathMatch:"full"},
  { 
      path:'Home',
      canActivate:[AuthGuard],
      loadChildren: () =>import('./modules/user/user.module')
        .then((m)=>m.UserModule)
  },
  {
    path:'**',component:NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
