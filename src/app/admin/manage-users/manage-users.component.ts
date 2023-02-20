import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
  @ViewChild('callDeleteDialog') callDeleteDialog! :TemplateRef<any>
  p:number=1;
  search:any;
  constructor(public user:UserService,private router:Router,private dialog :MatDialog) { }
 
  ngOnInit(): void {
  this.getAlluser();

  }
  getAlluser(){
    this.user.getAlluser();
     
  }

  byId(id:number){
  
   this.user.userId=id;
   this.router.navigate([`admin/userdetail/${id}`]);
  


  }

  OpenDialog(id:any){
    const dialogRef=this.dialog.open(this.callDeleteDialog);
    dialogRef.afterClosed().subscribe((res)=>{
      if(res!==undefined)
      {
        if(res=="yes")
        this.user.deleteUserById(id);
        
      }
    })

  }
  Search(){
   if(this.search== ""){
     this.ngOnInit();
   }else{
     this.user.allUser=this.user.allUser.filter((res:any) =>{
       return (res.username.toLocaleLowerCase()).match(this.search.toLocaleLowerCase())
     });
     
   }

  }

  

  


}
