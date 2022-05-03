import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog'

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
  private confirmDialogRef: MatDialogRef<ConfirmDialogComponent>
  ) { }

  ngOnInit(): void 
  {
  }
  closeConfirmDialog(){
    this.confirmDialogRef.close(false);
  }
}
