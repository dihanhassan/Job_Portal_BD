import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SideNavComponent } from '../employee-pannel/side-nav/side-nav.component';
import { ProfileComponent } from '../employee-pannel/profile/profile.component';
import { DashboardComponent } from '../employee-pannel/dashboard/dashboard.component';
import { ViewPostComponent } from '../employee-pannel/view-post/view-post.component';
import { RouterModule } from '@angular/router';

import { Routes } from '@angular/router';
import { Router } from 'express';

import { Component} from '@angular/core';






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

const routes: Routes = [
  {
    path: 'employee-pannel',
    component: SideNavComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'view-post',
        component: ViewPostComponent
      }
    ]
  }
]

@NgModule({
  declarations: [
    SideNavComponent,
    ProfileComponent,
    DashboardComponent,
    ViewPostComponent,
    
  ],
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
  
  
    
  ]
})
export class EmployeePannelModule { }
