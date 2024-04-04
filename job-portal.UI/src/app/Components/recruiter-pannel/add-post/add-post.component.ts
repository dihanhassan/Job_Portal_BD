import { Component ,OnInit} from '@angular/core';
import { NgModule } from '@angular/core';
import { Post } from '../../../Models/posts.model';
import { JobService } from '../../../Services/job.service';
import { error } from 'console';
import { environment } from '../../../../config/environment';
import { userValidity } from '../../../Models/user-validity.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.scss'
})
export class AddPostComponent implements OnInit{
  user : userValidity = {

    userID: '',
    userName: '',
    email: '',
    userType: 0,
    refreshToken: '',
    accessToken: '',

}
constructor(private jobService : JobService) { this.getUserValidition(); }

posts: Post[] = [];
requirement: string = '';
responsibility: string = '';
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

ngOnInit(): void {
  
}

submitForm(){
  console.log(this.newPost);
}
addPost(){
  let newRequriment  = this.requirement;
  let newResponsibility = this.responsibility;
  


  for(let i = 0; i < newRequriment.length; i++){
    if(newRequriment[i] == '\n'){
      newRequriment = newRequriment.replace('\n','#%#');
    }
  }
  for(let i = 0; i < newResponsibility.length; i++){
    if(newResponsibility[i] == '\n'){
       newResponsibility = newResponsibility.replace('\n','#%#');
    }
  }

  this.newPost.requirements = newRequriment.split('#%#');
  this.newPost.responsibilities = newResponsibility.split('#%#');

  this.newPost.userID = this.user.userID;

  console.log(this.user);
  this.jobService.addPost(this.newPost).subscribe(
    (data: Post) => {
      // Success case
      Swal.fire("Post Added Successfully", "","success");
      this.posts.push(data);
      console.log(this.posts);
    },error => {
      // Error case
      console.log(error);
    }
  );


  this.clearPost();

  
}
clearPost(){
  
  this.newPost = {
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
 
}

getUserValidition(){
  let userValidity = localStorage.getItem(environment.USER_VALIDITY);

  if(userValidity != null){
    var userInfo = JSON.parse(userValidity);
    this.user = userInfo;
  }


}
}
