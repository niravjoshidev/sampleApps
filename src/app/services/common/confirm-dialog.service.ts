import { Injectable } from '@angular/core';
import { MatDialog} from'@angular/material/dialog'
import { ConfirmDialogComponent } from 'src/app/components/common/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService {

  constructor(private dialog:MatDialog) { }

  openConfirmDialog(msg:any){
    return this.dialog.open(ConfirmDialogComponent,{
      width:'390px',
      disableClose:true,
      panelClass:"confirm-dialog-container",
      data:{
        message:msg
      },
      position:{
        top:"10px"
      }
    });
  }
}
