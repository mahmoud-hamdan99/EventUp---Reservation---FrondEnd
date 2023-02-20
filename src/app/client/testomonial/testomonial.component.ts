import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Testimonial } from 'src/app/models/Testimonial.model';
import { TestimonialService } from 'src/app/Services/testimonial.service';

@Component({
  selector: 'app-testomonial',
  templateUrl: './testomonial.component.html',
  styleUrls: ['./testomonial.component.css']
})
export class TestomonialComponent implements OnInit {

  constructor(public test: TestimonialService) { }
  testimonialGet: Testimonial[] = [];

  ngOnInit(): void {
    this.getTestomonialApproved();
  }
  getTestomonialApproved() {

    this.test.getTestimonialApproved()
      .subscribe(
        response => {
          this.testimonialGet = response;
          console.log(this.testimonialGet);
        }, err => {

          //hide spinner 

        }
      )


  }

}
