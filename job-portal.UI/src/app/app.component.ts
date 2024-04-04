import { Component ,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../config/environment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit  {
  title = 'job-portal.UI';

  /**
   *
   */
  constructor( private router: Router) {}

  
  ngOnInit() { 
    if(localStorage.getItem(environment.USER_VALIDITY)===null){
        this.router.navigate(['login']);
    }else{
      
     
    }
  }

 

}
