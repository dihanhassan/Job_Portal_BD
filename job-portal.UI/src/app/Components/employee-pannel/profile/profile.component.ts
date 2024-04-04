import { Component ,OnInit } from '@angular/core';
import { UserProfile } from '../../../Models/user-profile.model';
import { JobService } from '../../../Services/job.service';
import { environment } from '../../../../config/environment';
import { userValidity } from '../../../Models/user-validity.model';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {


  resumeFile: File | null = null;

  activeTab: string = 'general'; // Set default active tab

  user:UserProfile={
    userID:'',
    firstName: '',
    lastName: '',
     
    gender: '',
    mobileNumber: '',
      
    skill: '',
    institution: '',
      
    resume: null,
    resumeUrl: '',
   }
   userInf : userValidity = {

    userID: '',
    userName: '',
    email: '',
    userType: 0,
    refreshToken: '',
    accessToken: '',

}

  constructor(private jobService : JobService) { }

  ngOnInit(): void {
    this.getUserValidition();
  }

  getUserValidition(){
    let userValidity = localStorage.getItem(environment.USER_VALIDITY);
  
    if(userValidity != null){
      var userInfo = JSON.parse(userValidity);
      this.userInf = userInfo;
    }
  
  
  }

  setActiveTab(tabName: string) {
    this.activeTab = tabName;
  }

  saveChanges() {
    this.user.userID = this.userInf.userID;
    let formData = new FormData();

    // Type assertion for user object to explicitly specify its type
    let user: UserProfile = this.user as UserProfile;

    // Append each property of the user object to the formData
    Object.keys(user).forEach(key => {
        // Use a type assertion to avoid TypeScript error
        formData.append(key, (user as any)[key]);
    });
    // Logic to save changes
    console.log(this.user);
    this.jobService.updateUserProfile(formData).subscribe(
      (data: UserProfile) => {
        // Success case
        console.log(data);
      },
      (error) => {
        // Error case
        console.log(error);
      }
    );

  }

  cancel() {
    // Logic to cancel changes
  }
  uploadResume(event: any) {
    // Logic to upload resume
    if(event.target.files.length > 0) {
      const file = event.target.files[0] as File;
      this.resumeFile = file;
     
      
    }
    
  }

  submitResume() {
    // Logic to upload resume
    if (this.resumeFile !== null) { // Check if resumeFile is not null
      const formData = new FormData();
      formData.append('formFile', this.resumeFile);
      console.log(this.resumeFile)
      
      this.jobService.uploadResume(formData, this.userInf.userID).subscribe(
        (data: any) => {
          // Success case
          console.log("Success");
        },
        (error) => {
          // Error case
          console.log(error);
        }
      );
    } else {
      console.log("Resume file is null. Please select a file to upload.");
    }
  }
  
}
