import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(private spinner: NgxSpinnerService, public auth: AuthService, private tostar: ToastrService, private route: Router) { }
  data: any = {};
  users: any;
  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  })



  public selectedField = "";
  onFocus(identifier: string) {
    this.selectedField = identifier;
  }

  onBlur() {
    this.selectedField = "";
  }
  ngOnInit(): void {
    if (this.auth.IsloggedIn()) {
      this.route.navigate(['client']);
   }

  }

  submit() {
    this.spinner.show()

    console.log(this.loginForm.value);

    this.login();

    setTimeout(() => {

      this.spinner.hide();
    }, 5000);

  }

  login() {
    this.auth.login(this.loginForm.value).subscribe(next => {
      
      this.tostar.success(`Welcome ${this.auth.decodedToken?.unique_name}`)
      if (this.auth.position == "Admin" || this.auth.position == "MainAdmin")
        this.route.navigate(['admin'])
      else
        this.route.navigate([''])

    }, error => {
      this.tostar.error("Login Failed");



    })


  }

  loggedIn() {
    return this.auth.loggedIn();

  }
  logout() {
    localStorage.removeItem("token");

  }







}
