import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Testimonial } from 'src/app/models/Testimonial.model';
import { TestimonialService } from 'src/app/Services/testimonial.service';

@Component({
  selector: 'app-testomonial',
  templateUrl: './comp-testomonial.component.html',
  styleUrls: ['./comp-testomonial.component.css']
})
export class CompTestomonialComponent implements OnInit {

  constructor(private dialog: MatDialog, public toster: ToastrService, public testimonialService: TestimonialService, private spinner: NgxSpinnerService, private toastr: ToastrService) {





  }
  @ViewChild('addTestimonialDialog') addTestimonialDialog!: TemplateRef<any>

  TestimonialForm: FormGroup = new FormGroup({
    Personalname: new FormControl('', Validators.required),
    Feedback: new FormControl('', Validators.required),
    Status: new FormControl(),
    WebsiteId: new FormControl(),
    imageUrl: new FormControl(),
    ImageFile: new FormControl('', Validators.required),
    fileSource: new FormControl(''),
  });
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


    this.TestimonialForm.patchValue({
      fileSource: fileUpload
    })
    console.log(event)
  }



  testimonialGet: Testimonial[] = [];

  ngOnInit(): void {
    this.getTestimonial();

  }


  AddTestomonial() {


    this.testimonialService.addTestomonial(this.TestimonialForm.value);

  }

  submit() {
    this.spinner.show();
    console.log(this.TestimonialForm.value)
    this.AddTestomonial();

    setTimeout(() => {

      this.spinner.hide();
    }, 5000);

    window.location.reload();


  }











  getTestimonial() {
    this.spinner.show()
    this.testimonialService.getTestimonialApproved()
      .subscribe(
        response => {
          // this.testimonialGet[0]=response
          this.testimonialGet = response;
        }, err => {
          //hide spinner 
          this.spinner.hide();
        }
      )
    this.spinner.hide();
  }




}
