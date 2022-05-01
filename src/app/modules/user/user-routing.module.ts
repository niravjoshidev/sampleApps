import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from 'src/app/components/dashboard/dashboard.component';
import { UserLayoutComponent } from 'src/app/components/user-layout/user-layout.component';

const routes: Routes = [
  {
    path:'',component:UserLayoutComponent,children:
    [
      {
        path:'products',component:DashboardComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
