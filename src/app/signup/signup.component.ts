import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

declare var $:any;
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  registerForm=new FormGroup({
    first_name:new FormControl(null,[Validators.required,Validators.minLength(2),Validators.maxLength(10)]),
    last_name:new FormControl(null,[Validators.required,Validators.minLength(2),Validators.maxLength(10)]),
    age:new FormControl(null,[Validators.required,Validators.min(10),Validators.max(100)]),
    email:new FormControl(null,[Validators.email,Validators.required]),
    password:new FormControl(null,[Validators.required, Validators.pattern('^[a-zA-Z0-9]{8,30}$')]),
  })
isClicked:boolean= false;
inSuccess:boolean=false;
inFailure:boolean=false;
message:string=""
  constructor(private _AuthService:AuthService, private _Router:Router) { }

  submitData(){
    this.isClicked=true;
    
    console.log(this.registerForm)
    this._AuthService.signup(this.registerForm.value).subscribe(response =>{
      if(response.message == "success")
      {
        this.isClicked=false;
        this.inSuccess=true;
        this.inFailure=false;
        console.log(response);
        this.message=response.message;
        
        this._Router.navigate(["/signin"])
      }
      else
      {
        this.inFailure=true;
        this.inSuccess=false;
        console.log(response);
        this.isClicked=false;
        this.message=response.errors.email.message; 
      }
    })

  }

  ngOnInit(): void {
    $('#myPlug').particleground();
  }


}
