import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient,private router:Router) { }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
  postProduct(data:any){
   return this.http.post<any>("http://localhost:3000/productList/",data);
  }

  getProduct(){
    return this.http.get<any>("http://localhost:3000/productList/");
  }

  putProduct(data:any,id:number){
    return this.http.put<any>("http://localhost:3000/productList/" +id ,data)
  } 
  deleteProduct(id:number){
    return this.http.delete<any>("http://localhost:3000/productList/" +id)
  }

  validateUser(username:any,password:any){
    return this.http.get<any>("http://localhost:3000/users?username="+username+"&password=" + password)
  }
}
