import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(private http:HttpClient,private spinner:NgxSpinnerService,private toster:ToastrService) { }

  url:any=environment.baseUrl;

  
  Results:any =[];
  Events:any =[];


  EventsCountStatus(){
    

    this.spinner.show();
    return this.http.get(this.url+'Chart/EventsCountStatus').
    toPromise().then((res)=>{
      
      this.spinner.hide();
      return res;
 
    },err =>{
      this.spinner.hide();
      this.toster.error("Failed to Return Data ");
 
    });
  }


  HallsCountUsage(){
    

    this.spinner.show();
    return this.http.get(this.url+'Chart/HallsCountUsage').
    toPromise().then((res)=>{
      
      this.spinner.hide();
      this.toster.success("Data Returned Successfully");
      return res;
 
    },err =>{
      this.spinner.hide();
      this.toster.error("Failed to Return Data ");
 
    });
  }


  EventsCountMonths(){
    

    this.spinner.show();
    return this.http.get(this.url+'Chart/EventsCountMonths').
    toPromise().then((res)=>{
      
      this.spinner.hide();
      this.toster.success("Data Returned Successfully");
      return res;
 
    },err =>{
      this.spinner.hide();
      this.toster.error("Failed to Return Data ");
 
    });
  }


  UserCountOnAge(){
    

    this.spinner.show();
    return this.http.get(this.url+'Chart/UserCountOnAge').
    toPromise().then((res)=>{
      
      this.spinner.hide();
      this.toster.success("Data Returned Successfully");
      return res;
 
    },err =>{
      this.spinner.hide();
      this.toster.error("Failed to Return Data ");
 
    });
  }



  GetEarnings(){
    

    this.spinner.show();
    return this.http.get(this.url+'Chart/GetEarnings').
    toPromise().then((res)=>{
      
      this.spinner.hide();
      return res;
 
    },err =>{
      this.spinner.hide();
      this.toster.error("Failed to Return Data ");
 
    });
  }

}
