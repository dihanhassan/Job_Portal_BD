import { Component ,OnInit} from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit {
  constructor(private route : Router) {}

 ngOnInit(): void {
   
 }
  goToProfile(){
    
    this.route.navigate(['employee-pannel']);
  }
  logout(){
    this.route.navigate(['login']);
    localStorage.clear();

  }
}
