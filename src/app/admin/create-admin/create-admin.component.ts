import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.component.css']
})
export class CreateAdminComponent implements OnInit {

  AddAdminForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    birthDate: new FormControl(''),
    ImgFile: new FormControl(''),
    fileSource: new FormControl(''),
  })
  constructor(public user: UserService, private dialog: MatDialog, private spinner: NgxSpinnerService, private toster: ToastrService) { }
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


    this.AddAdminForm.patchValue({
      fileSource: fileUpload
    })
    console.log(event)
  }

  AddAdmin() {
    console.log(this.AddAdminForm.value);

    this.user.addAdmin(this.AddAdminForm.value).subscribe(() => {

    }, error => {
      if(error.status==200)
      {
        this.toster.success("Admin Added Successfully")
        setTimeout(() => {
          this.user.getAlladmin();
          this.spinner.hide();
        }, 3000);
        
      }
      else
      {
        this.toster.error("Failed to Add")
        this.spinner.hide();

      }
      
    });

  }

  submit() {
    this.spinner.show();
    console.log(this.AddAdminForm.value)
    this.AddAdmin();

    setTimeout(() => {

      this.spinner.hide();
    }, 5000);


  }


  ngOnInit(): void {
  }

}
