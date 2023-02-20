import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  mangerToken: any;
 

  constructor(private http:HttpClient,private spinner:NgxSpinnerService,private toster : ToastrService) { }
  user:any='';
  loggedin:boolean=false;
  id:any;
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  position:any;
 url=environment.baseUrl;
  login(model:any)
  {
return this.http.post(this.url+"Auth/Login",model).pipe(
  map((value:any) =>
  {
    const user=value;
    if(user !=null)
    {
    localStorage.setItem("token",user.token);
    this.decodedToken = this.jwtHelper.decodeToken(user.token);
    this.id=this.decodedToken.nameid;
    this.position=this.decodedToken?.role as string;
     console.log(this.decodedToken.nameid)
    this.loggedin=true;
  }
  }));
  }
 
  loggedIn()
  {
    const token=localStorage.getItem("token");
    return ! this.jwtHelper.isTokenExpired(token?.toString());
  }

  authrole(){
    const token=localStorage.getItem("token")?.toString();
    this.decodedToken = this.jwtHelper.decodeToken(token);
    this.position=this.decodedToken?.role as string;
    return this.position;
  }
   
 

  register(model:any)
  {
    
 this.loggedin=true;
 const fromData=new FormData();
  fromData.append('username',model.username);
  fromData.append('password',model.password);
  fromData.append('firstname',model.firstname);
  fromData.append('lastname',model.lastname);
  fromData.append('email',model.email);
  fromData.append('birthDate',model.birthDate);
  if(model.ImgFile!=""){  
  fromData.append('ImgFile',model.fileSource,model.fileSource.name);
  }
 return this.http.post(this.url+"Auth/Register",fromData).pipe(
  map((value:any) =>
  {
    
    const user=value;
    if(user !=null)
    {
    localStorage.setItem("token",user.token);
    this.decodedToken = this.jwtHelper.decodeToken(user.token);
    this.id=this.decodedToken?.namei as number;
    
   
    this.loggedin=true;
  }
  }));}

  changePassword(model:any){
       this.spinner.show();
      return this.http.put(this.url+"Auth/ChangePassword",model).subscribe((res)=>
      {
        if(res=='passowrd has Changed')
          this.toster.success('passowrd has Changed');
      
      },err=>{
        this.toster.error("Faild to change password");
      })
   


  }
  IsloggedIn(){
    
    const token =localStorage.getItem('token');
    return !!token;
  }
  
 
  

  

}