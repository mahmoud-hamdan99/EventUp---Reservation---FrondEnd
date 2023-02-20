import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http:HttpClient,private tostar:ToastrService,private spinner:NgxSpinnerService) { }

  url=environment.baseUrl;
  allPayment:any;
  balance:any;

  payment(model:any){
   return this.http.post(this.url+"Payment/payment",model).subscribe((res)=>{
    
      this.sendemail(model);

   },err=>{
  
   this.tostar.error("error to payment ");

  });

  }

  GetAllPayment(){
    this.spinner.show();
   return this.http.get(this.url+"Payment/GetAllPayment").subscribe((res)=>{
     
    this.spinner.hide();
    this.allPayment=res;
    this.tostar.success("Data retured");

   },err=>{

    this.spinner.hide();
    this.tostar.error("error to return data");

   })
}

GetBalance(){
  
  return this.http.get(this.url+"Payment/GetBalance").subscribe((res)=>{
    
   this.balance=res;
  },err=>{
  
   this.tostar.error("error to return data");

  })


}

private sendemail(model:object){
  
 
  return this.http.post(this.url+"Payment/SendEmail",model).subscribe((res)=>{
    
    
  },err=>{
  
   this.tostar.error("error to send email");

  });

}

rejectEvent(model:any){
  this.spinner.show();
 

  return this.http.get(this.url+`Event/RejectEvent/`+model.eventid).subscribe((res:any)=>{
   this.spinner.hide();
   debugger;
   model.status=res.status;
   this.sendemail(model)
   this.tostar.success("Event Rejected successfully");



  },err=>{
    this.spinner.hide();
    this.tostar.error("failed to Reject Event");

  })

}

acceptEvent(model:any){
  this.spinner.show();
  return this.http.get(this.url+"Event/AcceptEvent/"+model.eventid).subscribe((res:any)=>{
   this.spinner.hide();

   model.status=res.status;
   this.payment(model);
   this.tostar.success("Event accepted successfully");



  },err=>{
    this.spinner.hide();
    this.tostar.error("failed to accept Event");

  })

}


}
