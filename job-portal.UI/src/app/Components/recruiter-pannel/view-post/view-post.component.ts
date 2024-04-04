import { Component,OnInit } from '@angular/core';
import { Post } from '../../../Models/posts.model';
import { userValidity } from '../../../Models/user-validity.model';
import { AuthService } from '../../../Services/Auth.service';
import { JobService } from '../../../Services/job.service';
import { environment } from '../../../../config/environment';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrl: './view-post.component.scss'
})
export class ViewPostComponent  implements OnInit{
  posts: Post[] = [];

  newPost: Post = {
   userID: '',
   jobPostID: '',
   title: '',
   description: '',
   vacancy: 0,
   education: '',
   organization: '',
   location: '',
   requirements: [],
   responsibilities: [],
   compensation: '',
   employeeStatus: '',
   experience: '',
   created: new Date(),
   deadLine: new Date(),
   field: ''
 };

 user: userValidity = {
   userID: '',
   userName: '',
   email: '',
   userType: 0,
   refreshToken: '',
   accessToken: '',
}
  

  
  ngOnInit(): void {
   this.getCreatedPosts();
  }
  constructor(private authService: AuthService, private jobService :JobService,private router:Router) {
   
  }



  getCreatedPosts() {
    this.jobService.getCreatedPosts().subscribe(
      (data: Post[]) => {
        // Success case
        this.posts = data;
        console.log(this.posts);
      }
    );
  }

  // onCardClick(post : Post){
  //   console.log(post);
  //   const queryParams = {
  //     data: JSON.stringify(post)
  //   };
  //   console.log("Here");
  //   this.router.navigate(['recruiter-pannel/view-applicant'],{ queryParams });
  // }

  viewPost(post:Post){
    console.log(post.jobPostID);
    const queryParams = {
     
      data: JSON.stringify(post.jobPostID)
    };
    Swal.fire("Post Viewed Successfully", "","success");
    this.router.navigate(['recruiter-pannel/view-applicant'],{ queryParams });
  }
}
