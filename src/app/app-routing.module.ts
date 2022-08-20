import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path:"" ,redirectTo:"profile",pathMatch:"full"},
  {path:"signin", component:SigninComponent},
  {path:"signup", component:SignupComponent},
  {path:"profile",canActivate:[AuthGuard], component:ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
