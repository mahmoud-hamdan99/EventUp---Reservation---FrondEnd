import { Overlay } from '@angular/cdk/overlay';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/Services/user.service';
import { CreateAdminComponent } from '../create-admin/create-admin.component';

@Component({
  selector: 'app-manage-admin',
  templateUrl: './manage-admin.component.html',
  styleUrls: ['./manage-admin.component.css']
})
export class ManageAdminComponent implements OnInit {
  @ViewChild('callDeleteDialog') callDeleteDialog! :TemplateRef<any>
  search:any;
  p:any=1;
  constructor(private overlay:Overlay,public user:UserService,private dialog:MatDialog,private spinner:NgxSpinnerService,private toster:ToastrService,private router:Router) { }
  

  

  ngOnInit(): void {
  this.getAlladmin();
  }
  openCreatedialog(){
    this.dialog.open(CreateAdminComponent)

  }

  getAlladmin(){
    this.user.getAlladmin();
   
  }

  OpenDialog(id:any){
    console.log(id);
    const dialogRef=this.dialog.open(this.callDeleteDialog,{
      scrollStrategy:this.overlay.scrollStrategies.noop(),
      
     });
    dialogRef.afterClosed().subscribe((res)=>{
      if(res!==undefined)
      {
        if(res=="yes")
        this.user.deleteUserById(id);
        setTimeout(() => {
          this.user.getAlladmin();
        }, 3000);
      }
    })

  }

  byId(id:number){
    
    this.router.navigate([`admin/userdetail/${id}`]);


 
 
   }
   Search(){
    if(this.search== ""){
      this.ngOnInit();
    }else{
      this.user.allAdmin=this.user.allAdmin.filter((res:any) =>{
        return (res.username.toLocaleLowerCase()).match(this.search.toLocaleLowerCase())
      });
      
    }
  }
}
