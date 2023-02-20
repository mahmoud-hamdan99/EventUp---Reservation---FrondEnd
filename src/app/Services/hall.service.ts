import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class HallService {
  url:any=environment.baseUrl;

  allHalls:any=[];
  singleHall:any={};
  HallLoc:any={};
  Hall:any={};
  HallLocation:any={};
  Hallimages:any=[];
  hallid:number=0;
  hallImages:any[]=[];
  images:any[]=[];
  hallRate:any=[]
  cheapestHall:any=[]

  constructor(private http:HttpClient,private spinner:NgxSpinnerService,private toster:ToastrService) { }


  getAllHalls(){
    this.spinner.show();
   return this.http.get(this.url+"Hall/GetAllHalls")
   .subscribe((res)=>{

    this.allHalls=res;

    this.spinner.hide();

   },err =>{
     this.spinner.hide();
     this.toster.error("Failed to Return Data ");

   });
 }

 GetBestRate(){
  this.spinner.show();
  return this.http.get(this.url+"Hall/GetBestRate")
  .subscribe((res)=>{

   this.hallRate=res;

   this.spinner.hide();
 

  },err =>{
    this.spinner.hide();
   

  });

 }

 GetCheapestHall(){
  this.spinner.show();
  return this.http.get(this.url+"Hall/GetCheapestHall")
  .subscribe((res)=>{

   this.cheapestHall=res;

   this.spinner.hide();
 

  },err =>{
    this.spinner.hide();
   

  });

 }




 addNewHall(model:any){
  this.spinner.show();
  model.waiters = parseInt(model.waiters);
  model.rate = parseInt(model.rate);
  var halltoadd:any={};
  halltoadd.name=model.name;
  halltoadd.capacity=model.capacity;
  halltoadd.reservationprice=model.reservationprice;
  halltoadd.usage=model.usage;
  halltoadd.sale=model.sale;
  halltoadd.locationid=model.locationid;
  halltoadd.waiters= model.waiters;
  halltoadd.rate= model.rate;
  return this.http.post(this.url+"Hall/AddHall",halltoadd).subscribe((res:any)=>{
    this.spinner.hide();
    this.Hall=res;
    model.hallid=this.Hall.hallid

      this.addImages(model)  

   },err =>{
     this.spinner.hide();
     this.toster.error("Failed to add Hall");

   });

    
}
addLocation(model:any){
  this.spinner.show();
 var location:any={};
 location.City=model.City;
 location.Country=model.Country;
 location.latitude=model.latitude;
 location.longitude=model.longitude;

  return this.http.post(this.url+"Location/setLocation",location).subscribe((res:any)=>{
  
    this.HallLoc=res;
    model.locationid=this.HallLoc.locationid;
    this.spinner.hide();
    this.addNewHall(model);
    

   },err =>{
     this.spinner.hide();
     this.toster.error("Location Not  add to Hall");

   });

    
}

addImages(model:any){
  debugger;
  this.spinner.show();
  const fromData=new FormData();
  fromData.append('hallid',model.hallid);
  console.log(model.fileSource[0]);
    
    for (var i = 0; i < model.fileSource.length; i++) {  
      fromData.append("ImageFile", model.fileSource[i]); 
    } 

    return this.http.post(this.url+"Image/AddImage",fromData).subscribe((res:any)=>{
      this.spinner.hide();
      this.toster.success("hall added Successfully");
  
     },err =>{
      if(err.status==200)
      {
        this.toster.success('Hall added Successfully');
        this.spinner.hide();
      }
      else
      {
        this.toster.error('Hall not added');
        this.spinner.hide();
      }
  
  });


 
    
}


getHallById(id:number){
  this.spinner.show();
  this.http.get(this.url+"Hall/GetHallById/"+id)
  .subscribe((res)=>
  {
    this.singleHall=res;
    this.hallid= this.singleHall.hallid;
    
    this.spinner.hide();
  }
  ,err=>{
    this.spinner.hide();
    });

 }


 getHallByCapicity(cap:any){
  this.spinner.show();
  let Cap = parseInt(cap);
  this.http.get(this.url+"Hall/GetHallByCapacity/"+Cap)
  .subscribe((res)=>
  {
    this.allHalls=res;
    this.spinner.hide();
  }
  ,err=>{
    this.spinner.hide();
    });
 }


 getHallByPrice(price:any){
  this.spinner.show();
  let Price = parseInt(price);
  this.http.get(this.url+"Hall/GetHallByPrice/"+Price)
  .subscribe((res)=>
  {
    this.allHalls=res;
    this.spinner.hide();
  }
  ,err=>{
    this.spinner.hide();
    });
 }

 getHallByLocction(hallid:number){
  debugger;
  this.spinner.show();
  this.http.get(this.url+"Hall/GetHallByLocationId/"+hallid)
  .subscribe((res)=>
  {
    this.HallLocation=res;
    this.spinner.hide();
    console.log(this.HallLocation.latitude)
  }
  ,err=>{
    this.spinner.hide();
    });
 }


 getHallByUsage(usage:any){
  this.spinner.show();
  this.http.get(this.url+"Hall/GetHallByUsage/"+usage)
  .subscribe((res)=>
  {
    this.allHalls=res;
    this.spinner.hide();
  }
  ,err=>{
    this.spinner.hide();
    });
 }

 getHallByName(name:any){
  this.spinner.show();
  this.http.get(this.url+"Hall/GetHallByName/"+name)
  .subscribe((res)=>
  {
    this.allHalls=res;
    this.spinner.hide();
  }
  ,err=>{
    this.spinner.hide();
    });
 }

 deleteHall(id:number){
  console.log(id)
  this.spinner.show();
  this.http.delete(this.url+"Location/deleteLocation/"+id)
  .subscribe((res)=>{

   this.getAllHalls();
   this.spinner.hide();

  },err=>{

    if(err.status==200)
    {
      this.toster.success('Hall Deleted');
      this.getAllHalls();
      this.spinner.hide();
    }
    else
    {
      this.toster.error('Hall not Deleted');
      this.spinner.hide();
    }

  })


 }

 updateHall(model:any){
  model.hallid = this.singleHall.hallid;
  model.locationid = this.singleHall.locationid;
  model.waiters = parseInt(model.waiters);
  model.rate = parseInt(model.rate);
  debugger
  this.http.put(this.url+"Hall/UpdateHall",model)
  .subscribe((res)=>{
    this.toster.success('Updated Successfully :) ')
  }
  ,err=>{
    if(err.status==200){
      this.toster.success('Updated Successfully :)')
    }else
    this.toster.error('something error ');
  })


  

  
}
getHallImages(hallid:number){
  this.spinner.show();
  this.http.get(this.url+"Image/GetImageByHall/"+hallid).subscribe((res)=>
  {
    this.Hallimages=res;
    this.spinner.hide();
  }
  ,err=>{
    this.spinner.hide();
    });
 }









}




