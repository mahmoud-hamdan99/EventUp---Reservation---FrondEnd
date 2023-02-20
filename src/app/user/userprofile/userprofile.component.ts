import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from 'src/app/Services/auth.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
   showMe:boolean=false;
  updatForm:FormGroup=new FormGroup({
    email:new FormControl(''),
    firstname:new FormControl(),
    lastname:new FormControl(),
    birthdate:new FormControl(),
    imagename:new FormControl(),
    fileSource:new FormControl(),
  })

  changePassword:FormGroup=new FormGroup({
    CurrentPassword:new FormControl('',[Validators.required]),
    NewPassword:new FormControl('',[Validators.required, Validators.minLength(8)]),
    confirmpassword:new FormControl('',[Validators.required, Validators.minLength(8)])
  })
  
  
  jwtHelper = new JwtHelperService();
   isaccount:boolean=true;
  constructor(public user:UserService,private auth:AuthService) { }
  ngOnInit(): void {
    this.getUserProfile();
    
    
  }

  changeStatusAccount(){
    this.isaccount=this.isaccount ? true : false;

  }
 
  getUserProfile(){
    const user= localStorage.getItem('token')?.toString();
   const decodetoken=this.jwtHelper.decodeToken(user);
    this.user.getUserById(decodetoken.nameid);     
  }

  uploadFile(event:any){
    debugger
    if(event.target.files.length===0){
      return ;

    }
    let fileUpload=event.target.files[0];
   
 
     this.updatForm.patchValue({
      fileSource:fileUpload
     })
     
    
     
  }
  submit(){
  console.log(this.updatForm.value);
  this.user.updateProfile(this.updatForm.value);
  setTimeout(() => {
    window.location.reload();
    }, 8000);
  }

  onChange(){
    if(this.changePassword.controls['conpassword'].value==this.changePassword.controls['password'].value)
      this.changePassword.controls['conpassword'].setErrors(null);
      else 
      this.changePassword.controls['conpassword'].setErrors({mismatch:true});

  }

  submitpassowrd(){
    this.auth.changePassword(this.changePassword.value);

  }

 
}
