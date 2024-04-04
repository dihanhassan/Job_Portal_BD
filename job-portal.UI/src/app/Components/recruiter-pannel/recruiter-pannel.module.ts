import { NgModule ,Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from './side-nav/side-nav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddPostComponent } from './add-post/add-post.component';
import { ViewPostComponent } from './view-post/view-post.component';
import { RouterModule, Routes } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';

import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';

import {  FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import { ViewFullJobsComponent } from '../view-full-jobs/view-full-jobs.component';
import { ViewApplicantComponent } from './view-applicant/view-applicant.component';

import { ViewChild} from '@angular/core';
import {MatAccordion, MatExpansionModule} from '@angular/material/expansion';

import {provideNativeDateAdapter} from '@angular/material/core';


const routes: Routes = [

  {
    path:'recruiter-pannel',
    component:SideNavComponent,
    children:[
      {
        path:'dashboard',
        component:DashboardComponent
      },
      {
        path:'add-post',
        component:AddPostComponent
      },
      {
        path:'view-post',
        component:ViewPostComponent,
        
      },
      {
        path:'view-applicant',
        component:ViewApplicantComponent
      }
    ]
  },
 


];

@NgModule({
  declarations: [
    SideNavComponent,
    DashboardComponent,
    AddPostComponent,
    ViewPostComponent,
    ViewApplicantComponent,

   
  ],
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatSidenavModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatToolbarModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
  
    MatExpansionModule,
    
   

  ]
})
export class RecruiterPannelModule { }
