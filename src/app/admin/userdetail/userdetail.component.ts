import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'src/app/Services/event.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['./userdetail.component.css']
})
export class UserdetailComponent implements OnInit {
p:number=1;
userEvent:any=[];
userSingel:any={};
  constructor(public user:UserService,public event:EventService,private route:ActivatedRoute) { }

  ngOnInit(): void {
   
    this.getEventuser();   
    this.user.getUserById(this.route.snapshot.params['id']);
    // console.log(this.event.allEventUser);
  }

  getEventuser(){
    
    this.event.GetEventbyUserId(this.route.snapshot.params['id']);
    // console.log(this.event.allEventUser);
    this.userEvent=this.event.allEventUser;

  }
  

}
