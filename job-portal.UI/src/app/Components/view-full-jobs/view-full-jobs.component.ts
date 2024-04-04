import { Component,OnInit } from '@angular/core';
import { Post } from '../../Models/posts.model';
import { ActivatedRoute } from '@angular/router';
import { ToastModule } from 'primeng/toast';
@Component({
  selector: 'app-view-full-jobs',
  templateUrl: './view-full-jobs.component.html',
  styleUrl: './view-full-jobs.component.scss'
})
export class ViewFullJobsComponent implements OnInit{
  

  post : Post = {
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
  constructor(private route : ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const postData = params['data'];
      this.post = JSON.parse(postData);
      console.log(this.post);
    });
  }
  showSuccess(){

  }

}
