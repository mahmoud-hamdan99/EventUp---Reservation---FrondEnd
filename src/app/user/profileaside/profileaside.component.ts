import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-profileaside',
  templateUrl: './profileaside.component.html',
  styleUrls: ['./profileaside.component.css']
})
export class ProfileasideComponent implements OnInit {

  jwtHelper = new JwtHelperService();
  userrole:any;
  constructor() { }

  ngOnInit(): void {

    const user= localStorage.getItem('token')?.toString();
    if(user!=null){
    const decodetoken=this.jwtHelper.decodeToken(user);
    this.userrole=decodetoken.role;
    }
  }

}
