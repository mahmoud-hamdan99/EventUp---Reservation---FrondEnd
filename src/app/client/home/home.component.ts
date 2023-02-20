import { Component, OnInit, ViewChild } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import {  NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Testimonial } from 'src/app/models/Testimonial.model';
import { Website } from 'src/app/models/Website.model';
import { HallService } from 'src/app/Services/hall.service';
import { ReviewService } from 'src/app/Services/review.service';
import { StatisticsService } from 'src/app/Services/statistics.service';
import { TestimonialService } from 'src/app/Services/testimonial.service';
import { WebsiteService } from 'src/app/Services/website.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  
  currentRate: any = 0;
  websites: Website[] = [];
  backgroundimg: any;
  testimonialGet: Testimonial[] = [];
  jwtHelper = new JwtHelperService();
  username:any;
  userrole:any;
  p:number=1;
  n:number=1;
  noOfAcceptedEvents:number=0;
  noOfUsers:number=0;
  totalHalls:number=0;
  result:any =[];
  reviewForm: FormGroup = new FormGroup({
    Rate: new FormControl(),
   
  });


  constructor(public test: TestimonialService,public statistics : StatisticsService,public hall:HallService,private router:Router,public review:ReviewService, config1: NgbRatingConfig,public web: WebsiteService, private spinner: NgxSpinnerService, private toastr: ToastrService) {
    
     config1.max = 5;
  }
  
 

  ngOnInit(): void {
    this.getWebsite();
    this.hall.getAllHalls();
    this.hall.GetBestRate();
    this.review.getAvgReviews();
    this.hall.GetCheapestHall();
    this.getTestomonialApproved();
    const user= localStorage.getItem('token')?.toString();
    if(user!=null){
    const decodetoken=this.jwtHelper.decodeToken(user);
    this.username=decodetoken.unique_name;
    this.userrole=decodetoken.role;
    }

    this.statistics.EventsCountStatus().then((res) => {
      this.result.data = res;
    
    
      this.noOfAcceptedEvents = this.result.data.map((data:any) => data.acceptedEvent)
      
    })

   
    this.statistics.GetEarnings().then((res) => {
      this.result.data = res;
     
      this.noOfUsers = this.result.data.map((data:any) =>data.totalUsers )
      this.totalHalls = this.result.data.map((data:any) =>data.totalHalls )

    })

    
  }




  getTestomonialApproved() {

    this.test.getTestimonialApproved()
      .subscribe(
        response => {
          this.testimonialGet = response;
        
        }, err => {

          //hide spinner 

        }
      )


  }

  logoff(){
    localStorage.removeItem('token');
    this.router.navigate(['client']);
    this.toastr.info('logged out !')
  }


  loggedIn(){
    
    const token =localStorage.getItem('token');
    return !!token;
  }

  openHallDetails(id:any){
    
    this.router.navigate([`client/hallDetails/${id}`]);

  }

  openEventReserve(id:any){
   
    this.router.navigate([`client/reserveevent/${id}`]);

  }
  getWebsite() {
    this.spinner.show()
    this.web.getWebsite()
      .subscribe(
        response => {
          this.websites = response;
         this.backgroundimg=this.websites[0].backgroundimg
        }, err => {
          //hide spinner 
          this.spinner.hide();
        }
      )
    this.spinner.hide();
  }


  sendReview() {
    this.review.createReview(this.reviewForm.value);
    setTimeout(()=>{  
      this.review.getAvgReviews();                         // <<<---using ()=> syntax
  }, 2000);
  }


}
