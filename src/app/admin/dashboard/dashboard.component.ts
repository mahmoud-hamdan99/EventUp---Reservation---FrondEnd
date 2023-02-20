import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { Website } from 'src/app/models/Website.model';
import { WebsiteService } from 'src/app/Services/website.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  jwtHelper = new JwtHelperService();
  image:any;
  username:any;
  websites: Website[]=[] ;
  constructor(private router:Router,public web :WebsiteService,private tostar:ToastrService) {
    
   }

   
 
  ngOnInit(): void {
    const user= localStorage.getItem('token')?.toString();
    if(user!=null){
    const decodetoken=this.jwtHelper.decodeToken(user);
    this.image =decodetoken.actort
    this.username=decodetoken.unique_name;
    }
    this.getWebsite()
    
  }

  getWebsite() {
    this.web.getWebsite()
      .subscribe(
        response => {
          this.websites = response;
       
        }, err => {
          //hide spinner 
        
        }
      )
  }



  logoff(){
    localStorage.removeItem('token');
  
    this.router.navigate(['client']);
    this.tostar.success('logged out ! ')
  }

}
