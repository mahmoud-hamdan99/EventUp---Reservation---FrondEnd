import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-myreservation',
  templateUrl: './myreservation.component.html',
  styleUrls: ['./myreservation.component.css']
})
export class MyreservationComponent implements OnInit {

  userrole:any;
  constructor(public user:UserService,private router:Router,private toastr: ToastrService) { }
  
  jwtHelper = new JwtHelperService();
  ngOnInit(): void {
    const user= localStorage.getItem('token')?.toString();
    if(user!=null){
    const decodetoken=this.jwtHelper.decodeToken(user);
    this.user.getuserevent(decodetoken.nameid);
    this.userrole=decodetoken.role;
  }
  if (this.userrole=='MainAdmin'|| this.userrole=='Admin') {
    this.router.navigate(['accessforbidden/403']);
 }

}
}
