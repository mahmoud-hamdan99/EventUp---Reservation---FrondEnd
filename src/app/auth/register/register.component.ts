import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 
  constructor(public authService: AuthService, private spinner: NgxSpinnerService, private toster: ToastrService,private router:Router) { }
  registerForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    birthDate: new FormControl(''),
    ImgFile: new FormControl('',),
    fileSource: new FormControl(''),
    conpassword: new FormControl('', [Validators.required, Validators.minLength(8)])
  })
  public selectedField = "";

  onFocus(identifier: string) {
    this.selectedField = identifier;
  }

  onBlur() {
    this.selectedField = "";
  }
  uploadFile(event: any) {
    if (event.target.files.length === 0) {
      return;

    }
    let fileUpload = event.target.files[0];

    this.registerForm.patchValue({
      fileSource: fileUpload
    })
    console.log(event)
  }

  ngOnInit(): void {
    if (this.authService.IsloggedIn()) {
      this.router.navigate(['client']);
   }
  }


  register() {

    this.authService.register(this.registerForm.value).subscribe(() => {
      this.authService.loggedin = true;
      this.toster.success("Registered Successfully")
      this.router.navigate(['client']);

    }, error => {
      this.toster.error("Failed to Register")
    });

  }

  onChange() {
    if (this.registerForm.controls['conpassword'].value == this.registerForm.controls['password'].value)
      this.registerForm.controls['conpassword'].setErrors(null);
    else
      this.registerForm.controls['conpassword'].setErrors({ mismatch: true });

  }

  submit() {
    this.spinner.show();
    this.register();
    setTimeout(() => {

      this.spinner.hide();
    }, 3000);
  }


}
