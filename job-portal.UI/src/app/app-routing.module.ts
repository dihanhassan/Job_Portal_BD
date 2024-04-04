import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import path from 'path';
import { HomeComponent } from './Components/home/home.component';
import { ViewFullJobsComponent } from './Components/view-full-jobs/view-full-jobs.component';


const routes: Routes = [

  {path:'view-post',component:ViewFullJobsComponent},
 


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
