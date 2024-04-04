import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthModule } from './auth/auth.module';
import { HomeComponent } from './Components/home/home.component';


import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import {MatCardModule} from '@angular/material/card';
import { ViewFullJobsComponent } from './Components/view-full-jobs/view-full-jobs.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatTooltipModule} from '@angular/material/tooltip';


import {  FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';

import {MatListModule} from '@angular/material/list';


import {MatSidenavModule} from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatBadgeModule} from '@angular/material/badge';

import { RecruiterPannelModule } from './Components/recruiter-pannel/recruiter-pannel.module';

import { HttpClientModule, provideHttpClient, withInterceptors ,HttpInterceptor, HTTP_INTERCEPTORS} from '@angular/common/http';

import { TokenInterceptorService } from './Services/token-interceptor.service';

import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import { ToastModule } from 'primeng/toast';
import { NgToastModule } from 'ng-angular-popup';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { EmployeePannelModule } from './Components/employee-pannel/employee-pannel.module';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  
    ViewFullJobsComponent,
        NavBarComponent,
        FooterComponent,
      
       
   
  
  

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatTooltipModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
   
    ReactiveFormsModule,
    FormsModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatMenuModule,
    MatBadgeModule,
    HttpClientModule,
    MatDatepickerModule,
    ToastModule,
    NgToastModule,
    RecruiterPannelModule,
    EmployeePannelModule

  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    {provide: HTTP_INTERCEPTORS,useClass:TokenInterceptorService,multi:true},
    provideNativeDateAdapter(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
