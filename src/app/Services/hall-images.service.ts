import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HallImagesService {
  url:any=environment.baseUrl;

constructor(private http:HttpClient,private spinner:NgxSpinnerService,private toster:ToastrService) { }

  deleteHall(id:number){
    console.log(id)
    this.spinner.show();
    this.http.delete(this.url+"Image/deleteImage/"+id).subscribe((res)=>{
     this.spinner.hide();
  
    },err=>{
  
      if(err.status==200)
      {
        this.toster.success('Image Deleted Successfully');
        //this.getAllHalls();
        this.spinner.hide();
      }
      else if(err.Status=404){
        this.toster.error('Cant delete Main image');
        this.spinner.hide();
      }
      else
      {
        this.toster.error('Image not Deleted');
        this.spinner.hide();
      }
  
    })
  
  
   }
}
