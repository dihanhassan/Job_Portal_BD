import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent {

  sideBarOpen = true;

  constructor(private router: Router) { }

  
  
  ngOnInit(): void {
    
  }

  toggleSidebar() {
    this.sideBarOpen = !this.sideBarOpen;
  }
  logout(){
    this.router.navigate(['login']);
    localStorage.clear();
  }

}
