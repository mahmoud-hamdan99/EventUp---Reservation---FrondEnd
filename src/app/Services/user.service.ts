import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  

  constructor(private http:HttpClient,private spinner:NgxSpinnerService,private toster:ToastrService,private auth:AuthService,private router :Router) { }
 
  
  allUser:any=[];
  allAdmin:any=[];
  singelUser:any={};
  userId:any;
  userevent:any=[];
  url=environment.baseUrl;


  addAdmin(model:any){
    const fromData=new FormData();
    fromData.append('username',model.username);
    fromData.append('password',model.password);
    fromData.append('firstname',model.firstname);
    fromData.append('lastname',model.lastname);
    fromData.append('email',model.email);
    fromData.append('birthDate',model.birthDate);
    if(model.ImgFile!=""){      

      fromData.append('ImageFile',model.fileSource,model.fileSource.name);
        }

 
    return this.http.post(this.url+"user/AddAdmin",fromData).pipe(
      map((value:any) =>
      {
        
      })
      );
  }

  getAlluser()
  {
      this.spinner.show();
    this.http.get(this.url+"user/GetAllUser").subscribe((res)=>
    {
      this.allUser=res;

      this.spinner.hide();
      this.toster.success("Data Return")
      this.allUser.forEach((element:any) =>
       {
        if(element.image==null)
         element.image="http://res.cloudinary.com/apiimage2022/image/upload/v1647549616/User/k1c6hhbvjjakq14jvmlr.jpg"
        
      });
    }
    ,err=>{
      this.spinner.hide();
      this.toster.error("error");
      
      });
    
    }
  getAlladmin()
  {
    this.spinner.show();
     this.http.get(this.url+"user/GetAllAdmin").subscribe((res)=>
     {
       this.allAdmin=res;
       this.spinner.hide();
       this.toster.success("Data Return")
       this.allAdmin.forEach((element:any) =>
       {
        if(element.image==null)
         element.image="http://res.cloudinary.com/apiimage2022/image/upload/v1647549616/User/k1c6hhbvjjakq14jvmlr.jpg"
        
      });
     

     }
     ,err=>{
      this.spinner.hide();
       this.toster.error("error")
       }
    );}

       getUserById(id:number){
        this.spinner.show();
        this.http.get("https://localhost:44344/api/user/GetUserById/"+id).subscribe((res)=>
        {
 

          this.singelUser=res;
          this.userId=this.singelUser.Userid;

          this.spinner.hide();
          if(this.singelUser.image==null)
          this.singelUser.image='http://res.cloudinary.com/apiimage2022/image/upload/v1647549616/User/k1c6hhbvjjakq14jvmlr.jpg'
      
        }
        ,err=>{
          
          this.spinner.hide();
       
          
          });
       }

       deleteUserById(id:number){

        this.spinner.show();
        this.http.delete(this.url+"User/Deleteuser/"+id).subscribe((res)=>{
          
         
          this.getAlluser();
         this.spinner.hide();


        },err=>{
          if(err.status==200)
          {
            this.toster.success('User Deleted');
            this.getAlluser();
            this.spinner.hide();
          }
          else
          {
            this.toster.error('User not Deleted');
            this.spinner.hide();
    
          }
         
         
        })
       }

       updateProfile(model:any){
        const fromData=new FormData();
        
        if(model.imagename!=null){      
            fromData.append('ImageFile',model.fileSource,model.fileSource.name);
              }
        fromData.append('email',model.email);
        fromData.append('firstname',model.firstname);
        fromData.append('lastname',model.lastname);
        if(model.birthdate!=null){   
        fromData.append('birthDate',model.birthdate);}

        this.http.put(this.url+"user/Editprofile",fromData).subscribe((res)=>{
         
          this.toster.success('Updated Successfully :) ')
        },err=>{
          if(err.status==200){
            this.toster.success('Updated Successfully :) ')
          }else
          this.toster.error('something error ');
        })
        
    
        
      }

      searchUser(model:any){
        this.spinner.show();
        return this.http.get(this.url+"User/SearchUser",model).subscribe((res)=>{
         this.allUser=res;
         this.spinner.hide();
         
        },err=>{

          this.toster.warning("No data found")

        })

      }

      getuserevent(id:number){

      this.spinner.show();
      this.http.get(this.url+"Event/GetEventByUser/"+id).subscribe((res)=>
      {
      this.userevent=res;

      this.spinner.hide();
      this.toster.success("Data Return")
     
      },err=>{
      this.spinner.hide();
      this.toster.error("error");
      
      });

      }







  }


 

