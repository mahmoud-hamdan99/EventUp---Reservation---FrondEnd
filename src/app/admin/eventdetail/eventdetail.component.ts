import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/Services/event.service';
import { PaymentService } from 'src/app/Services/payment.service';

@Component({
  selector: 'app-eventdetail',
  templateUrl: './eventdetail.component.html',
  styleUrls: ['./eventdetail.component.css']
})
export class EventdetailComponent implements OnInit {

  constructor(public event :EventService,private payment:PaymentService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.event.getEventById(this.route.snapshot.params['id']);
  }

  accept(eventDetail:any){
    debugger;
   this.payment.acceptEvent(eventDetail)
   
  }

  Reject(eventDetail:any){
  this.payment.rejectEvent(eventDetail);
    
  }

}
