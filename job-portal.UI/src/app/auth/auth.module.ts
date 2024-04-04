import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from '../Components/home/home.component';


const routes: Routes = [


  
  { path: 'login', 
    component:LoginComponent
  },
  {
    path: 'home', 
    component: HomeComponent
 },
 
  
];

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    HttpClientModule
  ],
  exports: [RouterModule],
})
export class AuthModule { }
