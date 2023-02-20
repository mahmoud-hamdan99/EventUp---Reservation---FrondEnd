import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { About } from 'src/app/models/About.model';
import { Website } from 'src/app/models/Website.model';
import { AboutusService } from 'src/app/Services/aboutus.service';
import { WebsiteService } from 'src/app/Services/website.service';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  abouts :About[]=[];
  websites :Website[]=[];
  
  constructor(public aboutusService: AboutusService,public web:WebsiteService,private spinner :NgxSpinnerService,private toastr:ToastrService) {
   }
  
 

  ngOnInit(): void {
    this.getAboutUs();
    this.getWebsite();
  }

  getAboutUs(){
    this.spinner.show();
    this.aboutusService.getAboutUs()
    .subscribe(
      response => {
        this.abouts =response;
        console.log(this.abouts);
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
  getWebsite(){
    this.spinner.show()
    this.web.getWebsite()
    .subscribe(
      response => {
        this.websites =response;
        console.log(response);
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

}
