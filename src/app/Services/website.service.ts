import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Website } from '../models/Website.model';


@Injectable({
  providedIn: 'root'
})
export class WebsiteService {
  
  url:any=environment.baseUrl;
  website:any=[];
  display_Image:any;
  display_ImageBg:any;
  display_ImageLogo:any;
  constructor(private http:HttpClient,private spinner:NgxSpinnerService,private toastr :ToastrService) { }

  
  getWebsite():Observable<Website[]>{
    return this.http.get<Website[]>(this.url+'Website/GetAllWebsite');
  }

  updateWebsite(model:any,websiteid:any){
    
    const fromData=new FormData();
    if(model.fileSourceLogo!=""){     
    fromData.append('Logopath',model.fileSourceLogo,model.fileSourceLogo.name);
     }
    if(model.fileSourceBackground!=""){
     fromData.append('Backgroundimg',model.fileSourceBackground,model.fileSourceBackground.name);
    }
    fromData.append('Websiteid',websiteid);
    fromData.append('Websitename',model.Websitename);
    fromData.append('Telephone',model.Telephone);
    fromData.append('Email',model.Email);
    fromData.append('Worktime',model.Worktime);
    fromData.append('Address',model.Address);
    fromData.append('Logoinformation',model.logoinformation);
   
    return this.http.put(this.url+'Website/UpdateWebsite/',fromData)
  }

  
  public createImagpath(serverPath:string){
  
    return `https://localhost:44344/Images/Website/${serverPath}`
   }


}
