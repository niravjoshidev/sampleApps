import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { ConfirmDialogService } from 'src/app/services/common/confirm-dialog.service';
import { NotificationService } from 'src/app/services/common/notification.service';
import { EmployeeService } from 'src/app/services/employee.service';
import {EmployeeModel} from '../../models/employee-model.model';
import { map } from 'rxjs';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employeeList?: EmployeeModel[];
  displayedColumns: string[] = ['EmpFirstName', 'EmpLastName', 'EmpDateOfBirth','EmpEmail','EmpGender','EmpDepartment', 'EmpCity','action'];
  dataSource!: MatTableDataSource<EmployeeModel>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private confirmDialog:ConfirmDialogService,
    private notif:NotificationService,
    private _empService:EmployeeService,
    private _router:Router,
    private _loader:NgxUiLoaderService,
    ) 
    { }

  ngOnInit(): void {
    this.getAllEmployees();
  }

  getAllEmployees() {
    this._loader.start();
    this._empService.retriveEmployees().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.employeeList = data;
      this.dataSource = new MatTableDataSource(this.employeeList)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this._loader.stop();
    });
  }

  deleteEmployee(key:string){
    //console.warn(key);
    this.confirmDialog.openConfirmDialog("Are you sure you want to delete record ?")
    .afterClosed()
    .subscribe((ref) =>{
      if(ref){
        this._empService.deleteEmployee(key).then((res:any) =>{
            this.notif.success('Record delete successfully')
        });
      }
    });
  }

  getemployeeByKey(employee:EmployeeModel){
    console.log(employee);
    if(employee!=null){
      const key :any =employee.key;
      this._empService.SetEMployeeObject(employee);
      this._router.navigate(['/Home/employee/create']);
    }
    
  }

  addNewEMployee(){
    this._router.navigate(['/Home/employee/create']);
  }
}
