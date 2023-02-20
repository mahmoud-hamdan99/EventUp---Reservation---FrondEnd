import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Website } from 'src/app/models/Website.model';
import { WebsiteService } from 'src/app/Services/website.service';

@Component({
  selector: 'app-manage-website',
  templateUrl: './manage-website.component.html',
  styleUrls: ['./manage-website.component.css']
})
export class ManageWebsiteComponent implements OnInit {

  @ViewChild('editWebsiteDialog') editWebsiteDialog! :TemplateRef<any>

  editWebsiteForm: FormGroup = new FormGroup({
    Websitename: new FormControl('',Validators.required),
    Telephone: new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]),
    Email: new FormControl('',[Validators.required,Validators.email]),
    Address: new FormControl('',Validators.required),
    Worktime: new FormControl('',Validators.required),
    logoinformation: new FormControl('',Validators.required),
    Logo: new FormControl(),
    Background: new FormControl(),
    fileSourceLogo: new FormControl(''),
    fileSourceBackground: new FormControl(''),
  
  });


  
  websites :Website[]=[];
  website :Website ={
    websiteid: 0,
    websitename:'',
    logopath:'',
    backgroundimg:'',
    telephone:'',
    email:'',
    address:'',
    worktime:'',
    logoInformation:'',
    adminid:0
  }

  oldLogo :any;
  oldBg :any;

  constructor(private dialog:MatDialog,public web:WebsiteService,private spinner :NgxSpinnerService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.getWebsite();
  }
  public selectedField = "";
  onFocus(identifier: string) {
    this.selectedField = identifier;
  }

  onBlur() {
    this.selectedField = "";
  }

  getWebsite(){
    this.spinner.show();
    this.web.getWebsite()
    .subscribe(
      response => {
        this.websites =response;
       
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

 

  updateWebsite(website:any){
    this.spinner.show();
    this.web.updateWebsite(this.editWebsiteForm.value,website.websiteid)
    .subscribe((res:any)=>{
    this.getWebsite();
      this.spinner.hide();
     
      this.toastr.success('Updated Successfully :)')
    }, err=>{
      this.spinner.hide();
    })
    this.dialog.closeAll();
  
  }
  

  populateForm(website:Website,oldl:any,oldb:any){
    this.website=website;
    this.oldBg=oldb;
    this.oldLogo=oldl;
    this.dialog.open(this.editWebsiteDialog);
  }

  
  uploadFile(file:any,flaq:any){
    debugger;
    if(file.length===0){
      return ;
    }
      let fileUpload=<File>file[0];
      // file[0]:'angular.png';
       if(flaq==2){
        this.editWebsiteForm.patchValue({
          fileSourceLogo:fileUpload
         })
       }else if(flaq==1){
        this.editWebsiteForm.patchValue({
          fileSourceBackground:fileUpload
         })
       }
  }


}
