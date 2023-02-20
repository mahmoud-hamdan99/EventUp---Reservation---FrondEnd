import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})

export class RoleService {

  constructor(private http :HttpClient,private spinner:NgxSpinnerService,private toster:ToastrService) { }
  url=environment.baseUrl;
  allRoles:any=[];
  getAllRoles()
  {
      this.spinner.show();
    this.http.get(this.url+"Role/GetAllRoles").subscribe((res)=>
    {
      this.allRoles=res;
      this.spinner.hide();
      this.toster.success("All Roles Returned")
      console.log(this.allRoles);
    },err=>{
      this.spinner.hide();
      this.toster.error("Not Found");
      
      });
  }

    deleteRole(id:number)
    {
      this.spinner.show();
      debugger;
      this.http.delete(this.url+"Role/DeleteRole/"+id).subscribe((res)=>{
        this.getAllRoles();
       this.spinner.hide();
      },err=>{
        if(err.status==200)
        {
      
          console.log('Role Successfully Deleted');
          this.toster.success('Role Successfully Deleted');
          this.getAllRoles();
          this.spinner.hide();
        }
        else
        {
          console.log("Role  not Deleted");
          this.toster.error('Role Not  Deleted');
          this.spinner.hide();
  
        }})
     }
     AddRole(model:any)
     {
       debugger;
      this.spinner.show();
   return this.http.post(this.url+"Role/AddRole",model).pipe(
     map((value:any) =>
     {
      console.log("Role Add");
      
      this.spinner.hide();
     }));
     }

  
}