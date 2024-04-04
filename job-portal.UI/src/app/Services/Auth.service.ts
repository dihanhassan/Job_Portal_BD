import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';
import { Registration } from '../Models/registration.model';
import { response } from 'express';
import { Router } from '@angular/router';
import { Login } from '../Models/login.model';
import { userValidity } from '../Models/user-validity.model';
import { environment } from '../../config/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Console } from 'console';
@Injectable({
  providedIn: 'root'
})

export class AuthService {

    user: userValidity = {
        userID: '',
        userName: '',
        email: '',
        userType: 0,
        refreshToken: '',
        accessToken: '',
    }
 

    baseApiUrl:string = "https://localhost:7086/";

    public $refreshToken = new Subject<boolean>();
    


    constructor(private http:HttpClient,private router:Router) { 
        this.getUserInfo();
        this.$refreshToken.subscribe((res:any) => {
            console.log("Refresh Token Called");
            this.getAccessToken(this.user);
        });
    }

    registerUser(user:Registration) : Observable<Registration> {
        console.log(user);
       return this.http.post<any>(this.baseApiUrl + "api/Auth/registration", user)
       .pipe(map((response: { data: any; }) => response.data));
       
    }

    userLogin(user:Login) : Observable<userValidity>{
        return this.http.post<any>(this.baseApiUrl + "api/Auth/login", user)
        .pipe(map((response: { data: any; }) => response.data));
    }


    userLogout(){ 
        localStorage.clear();
        this.router.navigate(['/login']);
        window.location.reload();
    }


    getAccessToken(user: userValidity) : Observable<any> {
        console.log('Calling getAccessToken...');
        console.log('User:', user);
        
       return this.http.post<any>(this.baseApiUrl + "api/Auth/refresh-token", user);
             
            
    }


    // get user info 
    getUserInfo(){
        const storedUserValidity  = localStorage.getItem(environment.USER_VALIDITY);

        if(storedUserValidity != null){
            const userValidity  = JSON.parse(storedUserValidity);
            this.user=userValidity;
        }
    }
}