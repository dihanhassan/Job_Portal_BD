import { Component, OnInit } from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';
import { ViewChild} from '@angular/core';
import { JobService } from '../../../Services/job.service';
import { Applicant } from '../../../Models/applicant.model';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-applicant',
  templateUrl: './view-applicant.component.html',
  styleUrl: './view-applicant.component.scss'
})
export class ViewApplicantComponent implements OnInit{
 
  index:number = 0;
  applicants: Applicant[] = [];

   applicant:Applicant={
    firstName: '',
      lastName: '',
      email: '',
      gender: '',
      mobileNumber: '',
      experience: '',
      skill: '',
      institution: '',
      appliedDate: new Date(),
      resumeUrl: '',
   }
    jobPostID: string = '';
    constructor(private jobService : JobService,private route : ActivatedRoute) { }
    
    ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
        const postData = params['data'];
        if (postData) {
          this.jobPostID = JSON.parse(postData);
          console.log(this.jobPostID);
          this.getAllApplicants(this.jobPostID);
        } else {
          // Handle the case where data is not available
          console.error('No data available in queryParams');
        }
      });
    }

    getAllApplicants(jobPostID: string){
      this.jobService.getAllApplicants(jobPostID).subscribe(
        (data: Applicant[]) => {
          // Success case
          this.applicants = data;
          console.log(data);
        },
        (error) => {
          // Error case
          Swal.fire("Error to get Applicants", "","error");
          console.log(error);
        }
      );
    }
    
  
}
