import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

import { Website } from 'src/app/models/Website.model';
import { ContactusService } from 'src/app/Services/contactus.service';
import { WebsiteService } from 'src/app/Services/website.service';


@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
  ContactForm: FormGroup = new FormGroup({
    Personalname: new FormControl('', Validators.required),
    Phonenumber: new FormControl('', [Validators.required, Validators.pattern("^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$")]),
    Subject: new FormControl('', Validators.required),
    Message: new FormControl('', Validators.required)

  });

  public selectedField = "";
  websites: Website[] = [];
  constructor(private contactusService: ContactusService, public web: WebsiteService, private spinner: NgxSpinnerService, private toastr: ToastrService) { }


  ngOnInit(): void {
    this.getWebsite();
  }


  onFocus(identifier: string) {
    this.selectedField = identifier;
  }

  onBlur() {
    this.selectedField = "";
  }

  submit() {
    this.contactusService.createContact(this.ContactForm.value);
  }


  getWebsite() {
    this.spinner.show()
    this.web.getWebsite()
      .subscribe(
        response => {
          this.websites = response;
          console.log(response);
        }, err => {
          //hide spinner 
          this.spinner.hide();
          //Toastr
          this.toastr.error(err.message);
          this.toastr.error(err.status);
        }
      )
    this.spinner.hide();
  }
}
