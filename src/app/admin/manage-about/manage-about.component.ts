import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { About } from 'src/app/models/About.model';
import { AboutusService } from 'src/app/Services/aboutus.service';


@Component({
  selector: 'app-manage-about',
  templateUrl: './manage-about.component.html',
  styleUrls: ['./manage-about.component.css']
})
export class ManageAboutComponent implements OnInit {
 
  @ViewChild('editAboutDialog') editAboutDialog! :TemplateRef<any>

  aboutusform : FormGroup=new  FormGroup({
    Description:new FormControl(''),
    ImgFile:new FormControl(''),
    fileSource: new FormControl(''),
  })
  abouts :About[]=[];
  about :About ={
    aboutusid: 0,
    description:'',
    imagepath:'',
    websiteid:0
  }


  constructor(private dialog:MatDialog,public aboutusService:AboutusService,private spinner :NgxSpinnerService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.getAboutUs();
  }
  disable:boolean=true;

  descriptionChange()
  {
    this.disable=false;

  }
  getAboutUs(){
    this.spinner.show();
    this.aboutusService.getAboutUs()
  
    .subscribe(
      response => {
        this.abouts =response;
        
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

  updateAboutUs(aboutid:any){
    this.spinner.show();
    this.aboutusService.updateAboutUs(this.aboutusform.value,aboutid)
    .subscribe((res:any)=>{
      this.spinner.hide();
      this.toastr.success('Updated Successfully :) ')
    }, err=>{
      this.spinner.hide();
    })
  }
  

  populateForm(about:About){
    this.about=about;
    this.dialog.open(this.editAboutDialog);
  }

  
  uploadFile(event:any){
    if(event.target.files.length===0){
      return ;

    }
   
    let fileUpload=event.target.files[0];
    // file[0]:'angular.png';
    this.aboutusform.patchValue({
      fileSource:fileUpload
  });

  console.log(this.aboutusform.value)
  debugger;


}



}

