import { Timestamp } from "rxjs";

export class EmployeeModel 
{
    key?: string | null;
    EmpFirstName?: string;
    EmpLastName?: string;
    EmpMiddleName?: string;
    EmpEmail?:string;
    EmpCity?:string;
    EmpDateOfBirth?:string;
    EmpDepartment?:string;
    EmpGender?:string;
    EmpIsPermanent?:boolean
}
