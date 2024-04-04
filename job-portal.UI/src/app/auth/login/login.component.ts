import { Component } from '@angular/core';
import { Route } from '@angular/router';
import { Registration } from '../../Models/registration.model';
import { AuthService } from '../../Services/Auth.service';
import { warn } from 'console';
import { Login } from '../../Models/login.model';
import { userValidity } from '../../Models/user-validity.model';
import { Router } from '@angular/router';
import { environment } from '../../../config/environment';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  isSignDivVisiable: boolean  = true;
  confirmPassword : string = '';
  userRegister: Registration = {
    userID: '',
    userName: '',
    email: '',
    userPassword: '',
    userType: 0
  };

  userLogin : Login = {
    userName: '',
    userPassword: ''
  } 

  userValidity : userValidity = {
    userID: '',
    userName: '',
    email: '',
    userType: 0,
    refreshToken: '',
    accessToken: ''
  }

  constructor(private authService : AuthService,private router : Router){}


  setUserType(userType: number){
    this.userRegister.userType= userType;
    this.userRegister.userType = 1;
    console.log(this.userRegister );
  }

  onRegister() {
    
    if(this.userRegister.userPassword != this.confirmPassword){
      alert("Password and Confirm Password should be same");
      
    }else{
      console.log(this.userRegister );
      this.authService.registerUser(this.userRegister).subscribe((response) => {
         console.log(response);
         if(response.email==this.userRegister.email){
          Swal.fire("Registration Complete  Successfully", "","success");
         }else{
          Swal.fire("Erro to Registration.", "","error");
         }
      });
    }

    
    
  }

  onLogin() {
    
    console.log(this.userLogin);
   
    this.authService.userLogin(this.userLogin).subscribe((response) => {

      if(response === null){
       
        Swal.fire("Invalid User name or password", "","error");
      }
      else{
        Swal.fire("Login  Successfully", "","success");
        console.log(response);
        this.userValidity = response;
        console.log(this.userValidity);
        localStorage.setItem(environment.USER_VALIDITY, JSON.stringify(this.userValidity));   
        if(this.userValidity.userType === 0){
          this.router.navigate(['home']);
        }else if (this.userValidity.userType === 1){
          this.router.navigate(['recruiter-pannel']);
        }
        
      }


    
    });
     
  }


}

