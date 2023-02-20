import { Overlay } from '@angular/cdk/overlay';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { ThankyouComponent } from '../client/thankyou/thankyou.component';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private router:Router ,private http:HttpClient,private tostar:ToastrService,private spinner:NgxSpinnerService,private dialog:MatDialog,public overlay: Overlay) { }
  url=environment.baseUrl;
  allevent:any=[];
  allEventUser:any=[];
  singelEvent:any={};
  getAllEvent(){
   this.spinner.show();
   return this.http.get(this.url+"Event/AllEvent").subscribe((res)=>{
    this.allevent=res;
    this.spinner.hide();
    this.tostar.success("Data returned successfully");

   },err =>{

    this.spinner.hide();
    this.tostar.error("failed to return data");
   })

  }

  getEventById(id:number){

    this.spinner.show();
    return this.http.get(this.url+"Event/GetEventById/"+id).subscribe((res)=>{
     this.singelEvent=res;
     this.spinner.hide();
     this.tostar.success("Data returned successfully");



    },err=>{
      this.spinner.hide();
      this.tostar.error("failed to return data");

    })

  }
   
  deleteEvent(id:number){

    this.spinner.show();
    return this.http.get(this.url+"Event/deleteDeleteEvent/"+id).subscribe((res)=>{
     this.spinner.hide();
     this.tostar.success("Data deleted successfully");



    },err=>{
      this.spinner.hide();
      this.tostar.error("failed to delete data");

    })


  }


  acceptEvent(id:number){
    this.spinner.show();
    return this.http.get(this.url+"Event/AcceptEvent/"+id).subscribe((res)=>{
     this.spinner.hide();
     this.tostar.success("Event accepted successfully");



    },err=>{
      this.spinner.hide();
      this.tostar.error("failed to accept Event");

    })

  }

  rejectEvent(id:number){
    this.spinner.show();
    return this.http.get(this.url+"Event/RejectEvent/"+id).subscribe((res)=>{
     this.spinner.hide();
     this.tostar.success("Event Rejected successfully");



    },err=>{
      this.spinner.hide();
      this.tostar.error("failed to Reject Event");

    })

  }

  addEvent(model:any,userid:any,hallid:number,price:number){
   this.spinner.show();
   var data:any={};
   data.UserId=parseInt(userid);
   data.HallId=hallid;
   data.Eventtype=model.Eventtype;
   data.NoPerson=model.NoPerson;
   data.Startdate=model.Startdate
   data.Enddate=model.Enddate;
   data.totalprice=price;
   data.Cardname=model.Cardname;
   data.Ccv=model.ccv
   data.Expirededate=model.Expirededate
   data.Cardnumber=model.Cardnumber;
   data.country=model.country;
   data.city=model.city;
   data.fullname=model.fullname;
   console.log(data);
  
   debugger;
   return this.http.post(this.url+"Event/NewEvent",data).subscribe((res)=>{
    this.spinner.hide();
    this.tostar.success("Event Reserved successfully");


   },err=>{
     if(err.status==200){
      this.spinner.hide();
      this.tostar.success("Event Reserved successfully");
      const dialogRef = this.dialog.open(ThankyouComponent, {
        panelClass: ['animate__animated','animate__slideInLeft'],
        position:{top:"140px"},
        closeOnNavigation:true,
        scrollStrategy:this.overlay.scrollStrategies.noop(),
        
       });
       
    dialogRef.afterClosed().subscribe((res)=>{
      if(res!==undefined)
      {
        if(res=="yes")
        this.router.navigate([''])
        
      }else{
        this.router.navigate([''])
      }
    });
    
  
     }else if(err.status==400){
    this.spinner.hide();
    
    this.tostar.warning("Can't Resarve The Hall At This Time");
     }
     else if(err.status==404){
   this.spinner.hide();
   
   this.tostar.warning("Invalid Card");
  }else{
    this.spinner.hide();
    this.tostar.error("Something wrong");
  }

   })



  }

  GetEventbyUserId(id:number){
    this.spinner.show();
    return this.http.get(this.url+"Event/GetEventByUser/"+id).subscribe((res)=>{
     this.spinner.hide();
     this.allEventUser=res;
     this.tostar.success("Data returned successfully");



    },err=>{
      this.spinner.hide();
      this.tostar.error("failed to returned data");

    })

  }






}
