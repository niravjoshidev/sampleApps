import { Component, OnInit,ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from '../../dialog/dialog.component';
import { ApiService } from '../../services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import { MatSidenav} from '@angular/material/sidenav'
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ConfirmDialogService } from 'src/app/services/common/confirm-dialog.service';
import { NotificationService } from 'src/app/services/common/notification.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  displayedColumns: string[] = ['productName', 'category', 'date','freshness','price', 'comments','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog:MatDialog,
    private api:ApiService,
    private confirmDialog:ConfirmDialogService,
    private notif:NotificationService){

  }

  ngOnInit(): void 
  {
    this.getAllProducts()
  }

  
  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent,{
      width:"30%"
    }).afterClosed().subscribe(val=>{
      if(val==="Save"){
        this.getAllProducts()
      }
    });
    }
    getAllProducts(){
      this.api.getProduct().subscribe({
        next:(res)=>{
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort =this.sort;
        },
        error:()=>{
          this.notif.warn('error getting while fetching data')
        }
      })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editProduct(row:any){
    this.dialog.open(DialogComponent,{
      width:"30%",
      data:row
    }).afterClosed().subscribe(val=>{
      if(val==="Update"){
        this.getAllProducts()
      }
    });
  }

  deleteProduct(id:number){
    this.confirmDialog.openConfirmDialog("Are you sure you want to delete record ?")
    .afterClosed()
    .subscribe((ref) =>{
      if(ref){
        this.api.deleteProduct(id).subscribe({
          next:(res)=>{
            this.notif.success('Record delete successfully')
            this.getAllProducts();
          },
          error:()=>{
            this.notif.warn('Error while deleting records')
        }
      })
      }
    });
  }
  logOut(){
    this.api.logout()
  }
}
