import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Review } from 'src/app/models/Review.model';
import { ReviewService } from 'src/app/Services/review.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  review :Review[]=[];
  constructor(public reviewService: ReviewService,private spinner :NgxSpinnerService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.getAllReviews();
  }



  getAllReviews(){
    this.spinner.show();
    this.reviewService.getAllReviews()
    .subscribe(
      response => {
        this.review =response;
      },err =>{
        //hide spinner 
        this.spinner.hide(); 
        //Toastr
        this.toastr.error(err.message);
        this.toastr.error(err.status);    
      }
    )
    this.spinner.hide();
  }


  createRange(index:any){
    var items: number[] = [];
    for(var i = 1; i <= index; i++){
      items.push(i);
    }
    return items;
  }
 
 
 
}
