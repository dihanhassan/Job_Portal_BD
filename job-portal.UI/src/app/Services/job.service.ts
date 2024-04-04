import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Registration } from '../Models/registration.model';
import { response } from 'express';
import { Router } from '@angular/router';
import { Login } from '../Models/login.model';
import { userValidity } from '../Models/user-validity.model';
import { HomeComponent } from '../Components/home/home.component';
import { Post } from '../Models/posts.model';
import { environment } from '../../config/environment';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from './Auth.service';
import { throwError, BehaviorSubject, timer } from 'rxjs';
import { Applicant } from '../Models/applicant.model';
import { UserProfile } from '../Models/user-profile.model';
@Injectable({
  providedIn: 'root'
})

export class JobService {

    accessToken:string = '';
    refreshToken:string = '';
    userID:string = '';

    user: userValidity = {
        userID: '',
        userName: '',
        email: '',
        userType: 0,
        refreshToken: '',
        accessToken: '',
    }
 
    baseApiUrl:string = "https://localhost:7086/";

    
    constructor(private http:HttpClient,private authService : AuthService) {   this.getUserInfo();}

    getUserInfo(){
        const storedUserValidity  = localStorage.getItem(environment.USER_VALIDITY);

        if(storedUserValidity != null){
            const userValidity  = JSON.parse(storedUserValidity);
            this.accessToken = userValidity.accessToken;
            this.refreshToken = userValidity.refreshToken;
            this.userID = userValidity.userID;
            this.user=userValidity;
        }
    }

    getAllPosts() : Observable<Post[]> {
        
      

        return this.http.get<any>(this.baseApiUrl + "api/Recruiter/GetAllPosts")
            .pipe(
                 map((response: { data: any; }) => response.data),
            );

    }

    getCreatedPosts() : Observable<Post[]> {
     
        
        console.log(this.userID);
        return this.http.get<any>(this.baseApiUrl + "api/RecruiterPannel/GetCreatedPost?UserID="+this.userID)
            .pipe(
                 map((response: { data: any; }) => response.data),
            );
        
    }

    addPost (post: Post) : Observable<Post> {
        console.log(post);
        return this.http.post<any>(this.baseApiUrl + "api/Recruiter/AddPost", post)
        .pipe(map((response: { data: any; }) => response.data));
    }

    getAllApplicants(jobPostID : string) : Observable<Applicant[]> {
        return this.http.get<any>(this.baseApiUrl + "api/RecruiterPannel/GetApplicantInfo?JobPostID="+jobPostID)
            .pipe(
                 map((response: { data: any; }) => response.data),
            );
    }
    updateUserProfile(formData : any) : Observable<UserProfile>{
        console.log(formData);
        return this.http.post<any>(this.baseApiUrl + "api/Employee/UpdateSeekerProfile",formData)
        .pipe(
            map((response: { data: any; }) => response.data),
        );
    }

    uploadResume(formData : any,userID:string) : Observable<any>{
        return this.http.put<any>(`${this.baseApiUrl}api/Employee/UploadResume?UserID=${userID}`, formData)
        .pipe(
           
        );
    }

    getResume(userID:string) : Observable<any>{
        return this.http.get<any>(`${this.baseApiUrl}api/Employee/GetResume?UserID=${userID}`)
        .pipe(
           
        );
    }

   

    

  
}