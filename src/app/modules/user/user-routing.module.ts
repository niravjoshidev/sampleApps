import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatagoryComponent } from 'src/app/components/catagory/catagory.component';
import { DashboardComponent } from 'src/app/components/dashboard/dashboard.component';
import { EmployeeListComponent } from 'src/app/components/employee-list/employee-list.component';
import { EmployeeComponent } from 'src/app/components/employee/employee.component';
import { UserLayoutComponent } from 'src/app/components/user-layout/user-layout.component';

const routes: Routes = [
  {
    path:'',component:UserLayoutComponent,children:
    [
      {
        path:'products',component:DashboardComponent
      },
      {
        path:'employee',component:EmployeeListComponent
      },
      {
        path:'employee/create',component:EmployeeComponent
      },
      {
        path:'category',component:CatagoryComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
