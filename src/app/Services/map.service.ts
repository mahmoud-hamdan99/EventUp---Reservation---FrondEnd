import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';



@Injectable({
  providedIn: 'root'
})



export class MapService implements OnInit {
  url=environment.baseUrl;
  singellocation:any={};
  allLocation:any=[];
  allHallLocation:any=[];

  constructor(private http:HttpClient,private spinner:NgxSpinnerService,private toster:ToastrService,private auth:AuthService) { }
  ngOnInit(): void {
  }

  getAllLocation(){
  
    this.spinner.show();
      this.http.get(this.url+'Location/AllLocation').subscribe((res)=>{
      this.allLocation=res;
      this.spinner.hide();
    },err=>{
      this.spinner.hide();
      this.toster.error(err.message, err.status);
    })

     }

     setLocation(model:any){
      return this.http.post(this.url+"Location/setLocation",model).pipe(
        map((value:any) =>
        {
          
        })
        );
      }


     getlocationById(id:number){
      this.spinner.show();
      this.http.get(this.url+"Location/GetLocationById/"+id).subscribe((res)=>
      {
        this.singellocation=res;
        this.spinner.hide();
   
      }
      ,err=>{
        
        this.spinner.hide();       
        });
     }
     deleteLocation(id:number){
      this.http.delete(this.url+'Location/deleteLocation'+id).subscribe((res)=>{
        this.toster.success('Deleted Successfully :)');
      },err=>{
        this.toster.error(err.status,err.message);
      })
    }
    updateProlocation(model:any,id:number){
      
  
      this.http.put(this.url+"Location/UpdateLocation/"+id,model).subscribe((res)=>{
       
        this.toster.success('Updated Successfully :) ')
      },err=>{
        if(err.status==200){
          this.toster.success('Updated Successfully :) ')
        }else
        this.toster.error('something error ');
      })
      
    }

    gethallLoocation(){
      this.spinner.show();
      this.http.get(this.url+'Hall/GetAllHallsWithLocation').subscribe((res)=>{
      this.allHallLocation=res;
      this.spinner.hide();
    },err=>{
      this.spinner.hide();
      this.toster.error(err.message, err.status);
    })

    }




}
