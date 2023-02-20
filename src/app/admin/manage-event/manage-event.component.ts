import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from 'src/app/Services/event.service';

@Component({
  selector: 'app-manage-event',
  templateUrl: './manage-event.component.html',
  styleUrls: ['./manage-event.component.css']
})
export class ManageEventComponent implements OnInit {

  constructor(public event :EventService,private router:Router) { }

  ngOnInit(): void {
    this.event.getAllEvent();

  }

  byId(id:number){
    // this.event.getEventById(id);
    this.router.navigate([`admin/eventdetail/${id}`]);
 
   }

}
