import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Review } from '../models/Review.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
 
  constructor(private spinner:NgxSpinnerService,private toastr :ToastrService,private http:HttpClient) { }

  url:any =environment.baseUrl;
  review:any=[];
   reviewAvg:any={};

  getAllReviews():Observable<Review[]>{
    return this.http.get<Review[]>(this.url+'Review/GetAllReviews');
  }

  getAvgReviews(){
    return this.http.get(this.url+'Review/GetAvgReviews').subscribe(res=>{
      this.reviewAvg=res;
    });
  }


  createReview(review: any) {
    
    this.spinner.show(); 
    review.WebsiteId = 1;
    this.http.post(this.url + 'Review/AddReview/', review)
      .subscribe((res: any) => {
       
        this.spinner.hide();
        this.toastr.success('Send Successfully :) ')
      }, err => {
        this.spinner.hide();
        this.toastr.error(err.message, err.status)
      })

  }

}
