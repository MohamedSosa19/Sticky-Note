import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  Observable } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

   

  constructor(private _Http: HttpClient, private _Router:Router) { 
  
  }

 
  signup(userData:any):Observable<any>
  {
  return  this._Http.post("https://routeegypt.herokuapp.com/signup", userData)
  }
  signin(userData:any):Observable<any>
  {
    return  this._Http.post("https://routeegypt.herokuapp.com/signin", userData)
  }
  

  saveToken(){
   return !!localStorage.getItem("userToken")  
  }
}
