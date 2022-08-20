import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private _HttpClient:HttpClient) { }

getAllNotes(userNotes:any):Observable<any>  
{
  return this._HttpClient.post("https://routeegypt.herokuapp.com/getUserNotes",userNotes)
}
add_new_Note(userNotes:any):Observable<any>  
{
  return this._HttpClient.post("https://routeegypt.herokuapp.com/addNote",userNotes)
}
update_Note(userNotes:any):Observable<any>  
{
  return this._HttpClient.put("https://routeegypt.herokuapp.com/updateNote",userNotes)
}
delete_Note(userNotes:any):Observable<any>  
{
  let options={
    headers:new HttpHeaders({

    }),
    body: {
      NoteID:userNotes.NoteID,
      token:userNotes.token

    }
  }
  return this._HttpClient.delete("https://routeegypt.herokuapp.com/deleteNote",options)
}




}
