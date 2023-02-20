import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { Website } from 'src/app/models/Website.model';
import { HallService } from 'src/app/Services/hall.service';
import { WebsiteService } from 'src/app/Services/website.service';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  
  constructor(private router:Router,private tostar:ToastrService ,public web :WebsiteService,public hall:HallService) { }
  jwtHelper = new JwtHelperService();
  username:any;
  websites: Website[] = [];
  userrole:any;
  nameSearch:any;
  ngOnInit(): void {
    this.getWebsite();
    const user= localStorage.getItem('token')?.toString();
    if(user!=null){
    const decodetoken=this.jwtHelper.decodeToken(user);
    this.username=decodetoken.unique_name;
    this.userrole=decodetoken.role;
    }


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
    this.tostar.success('logged out !')
  }

  loggedIn(){
    
    const token =localStorage.getItem('token');
    return !!token;
  }


  keyDownFunction(event:any) {
    if (event.keyCode === 13) {
      this.search();
    }
  }

  search(){
    debugger
    if(this.nameSearch != "" && this.nameSearch != null)
    {
      this.hall.getHallByName(this.nameSearch.toLocaleLowerCase());
      this.router.navigate(['client/hall']);
    }
    else{
      this.router.navigate(['client/hall']);
    }
  }

  

}

 
