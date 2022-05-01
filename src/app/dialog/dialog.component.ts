import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validator, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog'
import { inject } from '@angular/core/testing';
import { NotificationService } from '../services/common/notification.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  freshneshList =["Brand List","second Hand","Refurnished"]
  productForm !: FormGroup
  actionBtn : string ="Save";
  constructor(private formBuilder : FormBuilder,
    private api:ApiService,
    @Inject(MAT_DIALOG_DATA) public editData:any,
    private dialogRef:MatDialogRef<DialogComponent>,
    private notif:NotificationService) 
  { 
    
  }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName:['',Validators.required],
      category:['',Validators.required],
      freshness:['',Validators.required],
      price:['',Validators.required],
      comments:['',Validators.required],
      date:['',Validators.required]
    })

    if(this.editData){
      this.productForm.controls['productName'].setValue(this.editData.productName);
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['freshness'].setValue(this.editData.freshness);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['comments'].setValue(this.editData.comments);
      this.productForm.controls['date'].setValue(this.editData.date);

      this.actionBtn = "Update"
    }
    console.log(this.editData);
  }

  AddProduct(){

    if(!this.editData){
      if(this.productForm.valid){
        this.api.postProduct(this.productForm.value).subscribe({
          next:(res)=>{
            this.notif.success('Record inserted successfully')
            this.productForm.reset();
            this.dialogRef.close('Save');
          },
          error:()=>{
            this.notif.warn("Error while adding records");
          }
        });
        console.log(this.productForm.value);
      }
    }else{
      this.api.putProduct(this.productForm.value,this.editData.id).subscribe({
        next:(res)=>{
          this.notif.success('Record updated successfully');
          this.productForm.reset();
          this.dialogRef.close('Update');
        },
        error:()=>{
          this.notif.warn("Error while updating records");
        }
      })
    }

  }
 
}
