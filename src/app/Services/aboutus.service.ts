import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { About } from '../models/About.model';


@Injectable({
  providedIn: 'root'
})
export class AboutusService {

  constructor(private http:HttpClient,private spinner:NgxSpinnerService,private toastr:ToastrService ) { }
  url:any=environment.baseUrl;
  
   
  getAboutUs():Observable<About[]>{
    return this.http.get<About[]>(this.url+'Aboutus/GetAboutUS');
  }

  updateAboutUs(model:any,aboutid:any){
    debugger;
    const fromData=new FormData();
     fromData.append('Aboutusid',aboutid);
     fromData.append('Description',model.Description);
     if(model.fileSource!=""){
      fromData.append('Imagepath',model.fileSource,model.fileSource.name);
     }
   
  
    return this.http.put(this.url+'Aboutus/UpdateAboutUS/',fromData)
  }

  public createImagpath(serverPath:string){
  
    return `https://localhost:44344/Images/Aboutus/${serverPath}`
   }



}
