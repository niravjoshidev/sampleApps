import { Component, OnInit } from '@angular/core';
import { CatagoryService } from 'src/app/services/catagory.service';
import { NotificationService } from 'src/app/services/common/notification.service';

@Component({
  selector: 'app-catagory',
  templateUrl: './catagory.component.html',
  styleUrls: ['./catagory.component.css']
})
export class CatagoryComponent implements OnInit {

  search:string=""; 
  data:any=[]
  constructor(private _categoryService:CatagoryService,private _notif:NotificationService) { }

  ngOnInit(): void {
  }

  searchImage(){
    this._categoryService.getImages(this.search).subscribe((res) => {
      if(res.photos.length > 0){
        this.data = res.photos;
        console.log(this.data);
      }else{
        this._notif.warn('No record found')
      }
      
    },(error) => {
      console.log(error)
    })
  }
}
