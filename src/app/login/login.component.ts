import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validator, Validators, RequiredValidator } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from '../services/api.service';
import { NotificationService } from '../services/common/notification.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginForm !: FormGroup;
  

constructor(private formBuilder:FormBuilder,
    private api:ApiService, 
    private router:Router,
    private notif:NotificationService,
    private loader:NgxUiLoaderService){

}
  ngOnInit(): void {
    if(this.api.isLoggedIn()){
      this.router.navigate(["Home"])
    }

    this.loginForm = this.formBuilder.group({
      userName:['',Validators.required],
      password:['',Validators.required]
    })
  }

  ValidateUser(){
    this.loader.start();
    if(this.loginForm.valid){
      let username :string = this.loginForm.value.userName;
      let password :string = this.loginForm.value.password;
      this.api.validateUser(username,password).subscribe({
        next:(ref)=>{
          if(ref.length > 0){
            console.warn('login success!!')
            this.api.setToken('abcdefghijklmnopqrstuvwxyz');
            this.loader.stop();
            this.router.navigate(['Home'])
          }
          else{
            this.loader.stop();
           this.notif.error('username or password invalid');
          }
        },
        error:(err) =>{
          this.loader.stop();
          this.notif.error('something went wrong');
        }
      })
    }

  }
}

