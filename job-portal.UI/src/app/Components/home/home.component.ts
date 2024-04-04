import { Component, OnInit } from '@angular/core';
import { Post } from '../../Models/posts.model';
import { JobService } from '../../Services/job.service';
import { userValidity } from '../../Models/user-validity.model';
import { environment } from '../../../config/environment';
import { AuthService } from '../../Services/Auth.service';
import { Router } from '@angular/router';
import { json } from 'stream/consumers';
import { FormControl, Validators } from '@angular/forms';

interface Filter {
  name: string;
  sound: string;
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})


export class HomeComponent implements OnInit {
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
  

filterControl = new FormControl<Filter | null>(null, Validators.required);
selectFormControl = new FormControl('', Validators.required);
options: Filter[] = [
  {name: 'Dead Line', sound: 'Woof!'},
  {name: 'Created Date', sound: 'Meow!'},
  
];


  constructor(private authService: AuthService,private jobService : JobService,private router:Router ) {}
  ngOnInit(): void {
    this.getAllPosts();
  }

  getAllPosts() {
    this.jobService.getAllPosts().subscribe(
      (data: Post[]) => {
        // Success case
        this.posts = data;
        console.log(this.posts);
      },
      (error) => {
        // Error case
        console.error('Error registering user:', error);
        
        // Handle error as needed, e.g., show error message to the user

        
      }
    );
  }


  onCardClick(post : Post){
    console.log(post);
    const queryParams = {
      data: JSON.stringify(post)
    };
   
    this.router.navigate(['/view-post'],{ queryParams });
  }
  



}
