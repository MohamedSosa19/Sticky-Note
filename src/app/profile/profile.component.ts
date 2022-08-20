import { Component, OnInit } from '@angular/core';
import { CrudService } from '../crud.service';
import jwt_decode from "jwt-decode";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
 isready:boolean=false; 
 selectedID:any;
 received_Notes:any;     // Array of received notes
  decoded:any;
  token:any;
notFound:boolean=false;
  constructor(private _CrudService:CrudService , private _Router:Router) {
    try {
      this.token = localStorage.getItem('userToken') ;
      this.decoded = jwt_decode(this.token);
      
    } catch (error) {
      localStorage.removeItem("userToken")
      this._Router.navigate(["/signin"]);
    }
   
    this.display()

   }
   display()
   {
   let user_data=
   {
     token:this.token,
     userID:this.decoded._id        
   }

 this._CrudService.getAllNotes(user_data).subscribe(response=>{
   console.log(response)
   if(response.message=="success")
   {
    this.received_Notes=response.Notes;
     this.isready=true;
    console.log(this.received_Notes)
   }
   else if(response.message=="no notes found")
   {
     this.notFound=true;
     this.isready=true;
   }
 })
   }

  //  Adding Form
   addNote=new FormGroup({
    title:new FormControl(null,Validators.required),
    desc:new FormControl(null,Validators.required),
  })

   add_Note()
   {
     let data ={
       title:this.addNote.value.title,
       desc:this.addNote.value.desc,
       token:this.token,
       citizenID:this.decoded._id
     }

      this._CrudService.add_new_Note(data).subscribe(response=>{
        console.log(response)
        if(response.message == "success")
        {
          this.isready=true;
          this.display();
          this.notFound=false;
        }
      })
      this.addNote.reset();
   }
   
   getID(id:string)
   {
     
     this.selectedID=id;
   }
  //edite  form group
   editeNote=new FormGroup({
    title:new FormControl(null,Validators.required),
    desc:new FormControl(null,Validators.required),
  })
   setValue()
   {
     for(let i=0; i<this.received_Notes.length; i++)
     {
       if(this.received_Notes[i]._id==this.selectedID)
       {
         console.log(this.received_Notes[i]._id)
         this.editeNote.controls.title.setValue(this.received_Notes[i].title);
         this.editeNote.controls.desc.setValue(this.received_Notes[i].desc);
       }

     }

   }

   update()
   {
     let data={
       title:this.editeNote.value.title,
       desc:this.editeNote.value.desc,
       NoteID:this.selectedID,
       token:this.token,

     }
     this._CrudService.update_Note(data).subscribe(response=>{
       if(response.message == "updated")
       {
        this.isready=true;
        this.display();
       }
     })
   }

   deleteNote()
   {
     let data={
       NoteID:this.selectedID,
       token:this.token,

     }
     this._CrudService.delete_Note(data).subscribe(response=>{
       console.log(response);
       if(response.message == "deleted")
       {
         this.display();
       }
     })

   }

  ngOnInit(): void {}

}
