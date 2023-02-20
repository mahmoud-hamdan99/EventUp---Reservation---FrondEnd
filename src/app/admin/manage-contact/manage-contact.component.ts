import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Contact } from 'src/app/models/Contact.model';

import { MatDialog } from '@angular/material/dialog';
import { ContactusService } from 'src/app/Services/contactus.service';


@Component({
  selector: 'app-manage-contact',
  templateUrl: './manage-contact.component.html',
  styleUrls: ['./manage-contact.component.css']
})
export class ManageContactComponent implements OnInit {

  @ViewChild('callDeleteDialog') callDeleteDialog! :TemplateRef<any>

  contacts :Contact[]=[];
  p:number=1;
  constructor(private dialog:MatDialog,public contactusService:ContactusService,private spinner :NgxSpinnerService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.getAllContacts();
  }


  getAllContacts(){
    this.spinner.show();
    this.contactusService.getAllContacts()
    .subscribe(
      response => {
        this.contacts =response;
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

  deleteContact(id:number){
    this.spinner.show();
    this.contactusService.deleteContact(id)
    .subscribe(
      response => {
      },err =>{
        //hide spinner 
        this.spinner.hide(); 
        //Toastr
      }
    )
    this.spinner.hide();
    this.toastr.success('Contact deleted successfully !');
    window.location.reload();
    
  }


  openDeleteDialog(contactid:any){
    const dialogRef=this.dialog.open(this.callDeleteDialog);
    dialogRef.afterClosed().subscribe((res)=>{
      if(res!==undefined)
      {
        if(res=="yes")
        this.deleteContact(contactid);
        else if(res=="no")
        console.log("Thank you ");
        
      }
    })

  }
}
