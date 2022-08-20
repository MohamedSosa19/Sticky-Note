import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

declare var $:any;

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  loginForm=new FormGroup({
    email:new FormControl(null,[Validators.email,Validators.required]),
    password:new FormControl(null,[Validators.pattern('^[a-zA-Z0-9]{8,12}$'),Validators.required]),
  })

  isClicked:boolean= false;
  inSuccess:boolean=false;
  inFailure:boolean=false;
  message:string=""
  constructor(private _AuthService:AuthService, private _Router:Router) {
    if(this._AuthService.saveToken()){
      this._Router.navigate(["/profile"]);
    }
   }

  login(loginForm:FormGroup){
    this.isClicked=true;
    
    
    this._AuthService.signin(this.loginForm.value).subscribe(response =>{
      if(response.message == "success")
      {
        // console.log(response)
        this.isClicked=false;
        this.inSuccess=true;
        this.inFailure=false;
        this.message=response.message;
        localStorage.setItem("userToken",response.token);
        this._Router.navigate(["/profile"])
      }
      else
      {
        this.inFailure=true;
        this.inSuccess=false;
        console.log(response);
        this.isClicked=false;
        this.message=response.message;
      }
    })

  }

  ngOnInit(): void {
    $('#myPlug').particleground();
  }

}
