export interface UserProfile {
    userID:string,
    firstName: string,
      lastName: string;
     
      gender: string;
      mobileNumber: string;
     
      skill: string;
      institution: string;
      
      resume?: File | null;
      resumeUrl?: string;
     

      

}