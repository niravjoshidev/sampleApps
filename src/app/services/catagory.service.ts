import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CatagoryService {

   _httpOps= new HttpHeaders({
    'Authorization':environment.Pexel_API_Key,
    // "Access-Control-Allow-Methods":"GET, POST",
    // 'Access-Control-Allow-Origin':'*'
  })
  constructor(private _http:HttpClient) { }

  getImages(category:string) : Observable<any>
  {
    return this._http.get(environment.Pexel_Base_Url + 'search?query='+category+'&per_page=15&orientation=landscape&size=medium',{headers : this._httpOps});
  }
}
