import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {AngularFireDatabase,AngularFireList} from '@angular/fire/compat/database'
import { EmployeeModel } from '../models/employee-model.model';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  $empObject?:EmployeeModel
  _key?:string ="";
  private dbPath = '/employees';
  employeeList:AngularFireList<EmployeeModel>

  constructor(private _httpClient:HttpClient,
    private _db:AngularFireDatabase
    ) { 
      this.employeeList =_db.list(this.dbPath)
    }

  // setKey(key: string) {
  //   this._key = key;
  // }
  // getKey() {
  //   return this._key;
  // }

    SetEMployeeObject(obj:EmployeeModel){
      this.$empObject =obj;
    }
    GetEMployeeObject(){
      return this.$empObject;
    }
    retriveEmployees(): AngularFireList<EmployeeModel> {
      return this.employeeList;
    }
    postEmployee(emp: EmployeeModel): any {
      return this.employeeList.push(emp);
    }
    updateEMployee(key:string,emp:EmployeeModel){
      return this.employeeList.update(key,emp);
    }
    deleteEmployee(key:string):any{
      return this.employeeList.remove(key);
    }

    retrieveEmployeeById(key:string)
    {
      return this._db.list(this.dbPath,ref => ref.equalTo(key)).valueChanges()
    }

    formatDate(date:Date):string{
      const day = date.getDate();
      const month =date.getMonth() +1;
      const year=date.getFullYear();

      return `${month}/${day}/${year}`;
    }
}
