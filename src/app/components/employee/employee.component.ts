import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { NotificationService } from 'src/app/services/common/notification.service';
import { EmployeeService } from 'src/app/services/employee.service';
import {EmployeeModel} from '../../models/employee-model.model'

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  btnSaveCaption:string ="Save";
  EmployeeForm!: FormGroup;
  employee: EmployeeModel =new EmployeeModel(); 
  genderList =["Male","Female","Unknown"];
  cityList=["Ahmedabad","Vadodara","Surat","Rajkot","Bhavnafgar","Jamnagar","Junagadh"];
  departmentList=["Development","Testing","Marketing"]

  constructor(
          private formBuilder : FormBuilder,
          private _empService:EmployeeService,
          private _notif:NotificationService,
          private _router:Router,
          private loader:NgxUiLoaderService) 
  { 

  }

  ngOnInit(): void {
    this.EmployeeForm = this.formBuilder.group({
      key:[null],
      EmpFirstName:['',Validators.required],
      EmpMiddleName:['',Validators.required],
      EmpLastName:['',Validators.required],
      EmpDateOfBirth:['',Validators.required],
      EmpGender:['',Validators.required],
      EmpEmail:['',Validators.required],
      EmpCity:['',Validators.required],
      EmpDepartment:['',Validators.required],
      EmpIsPermantnt:[],
    })
    this.GetKey();
  }

  GetKey() {
    const obj = this._empService.GetEMployeeObject();
    if(obj!=null && obj.key!=undefined &&obj.key!=null && obj.key!=''){
      this.btnSaveCaption ="Update"
      this._empService.SetEMployeeObject(new EmployeeModel());
      console.log(obj.EmpIsPermanent);
      
      this.EmployeeForm.controls['key'].setValue(obj.key);
      this.EmployeeForm.controls['EmpFirstName'].setValue(obj.EmpFirstName);
      this.EmployeeForm.controls['EmpMiddleName'].setValue(obj.EmpMiddleName);
      this.EmployeeForm.controls['EmpLastName'].setValue(obj.EmpLastName);
      if(obj.EmpDateOfBirth!=null){
        this.EmployeeForm.controls['EmpDateOfBirth'].setValue(new Date(obj.EmpDateOfBirth));
      }
      this.EmployeeForm.controls['EmpGender'].setValue(obj.EmpGender);
      this.EmployeeForm.controls['EmpEmail'].setValue(obj.EmpEmail);
      this.EmployeeForm.controls['EmpCity'].setValue(obj.EmpCity);
      this.EmployeeForm.controls['EmpDepartment'].setValue(obj.EmpDepartment);
      this.EmployeeForm.controls['EmpIsPermantnt'].setValue(obj.EmpIsPermanent);
    }
  }
  AddEmployee() {
    if (this.EmployeeForm.valid) {
      this.loader.start();
      //console.log(this.EmployeeForm.controls['key'].value);
       
      if (this.EmployeeForm.controls['key'].value == null) 
      {
        const obj = this.setModelObject(this.EmployeeForm);
        console.log(obj.EmpIsPermanent);
        
        this._empService.postEmployee(obj).then(() => 
        {
          this.loader.stop();
          this._notif.success('Record inserted successfully')
          this.EmployeeForm.reset();
          this._router.navigate(['/Home/employee']);
        })
      }
      else {
        const obj = this.setModelObject(this.EmployeeForm);
        console.log(obj.EmpIsPermanent);
        
        this._empService.updateEMployee(this.EmployeeForm.controls['key'].value ,obj).then(() => 
        {
          this.loader.stop();
          this._notif.success('Record updated successfully')
          this.EmployeeForm.reset();
          this._router.navigate(['/Home/employee']);
        })
      }
    }
    else {
      this._notif.error('Please fill the required fields.')
    }
  }
  CancelForm() {
    this._router.navigate(['/Home/employee']);
  }

  setModelObject(formgrp: FormGroup): EmployeeModel {
    console.log(formgrp.value.EmpIsPermanent);
    this.employee.EmpFirstName = formgrp.value.EmpFirstName;
    this.employee.EmpMiddleName = formgrp.value.EmpMiddleName;
    this.employee.EmpLastName = formgrp.value.EmpLastName;
    this.employee.EmpGender = formgrp.value.EmpGender;
    this.employee.EmpDateOfBirth = this._empService.formatDate(formgrp.value.EmpDateOfBirth);
    this.employee.EmpCity = formgrp.value.EmpCity;
    this.employee.EmpDepartment = formgrp.value.EmpDepartment;
    this.employee.EmpEmail = formgrp.value.EmpEmail;
    this.employee.EmpIsPermanent = (formgrp.value.EmpIsPermantnt === true);
    return this.employee;
  }

}
