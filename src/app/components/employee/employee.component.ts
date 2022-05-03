import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  options!: FormGroup;
  hideRequiredControl = new FormControl(false, Validators.required);
  genderList =["Male","Female","Unknown"];
  cityList=["Ahmedabad","Vadodara","Surat","Rajkot","Bhavnafgar","Jamnagar","Junagadh"];
  departmentList=["Development","Testing","Marketing"]
  constructor(fb: FormBuilder) { 

    this.options = fb.group({
      hideRequired: this.hideRequiredControl
      
    });
  }

  ngOnInit(): void {
  }

}
