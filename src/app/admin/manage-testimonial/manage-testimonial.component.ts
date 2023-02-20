import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Testimonial } from 'src/app/models/Testimonial.model';
import { TestimonialService } from 'src/app/Services/testimonial.service';


@Component({
  selector: 'app-manage-testimonial',
  templateUrl: './manage-testimonial.component.html',
  styleUrls: ['./manage-testimonial.component.css']
})
export class ManageTestimonialComponent implements OnInit {
  p :number=1;
  testimonials:Testimonial[]=[];
  constructor(public testimonial: TestimonialService,private spinner :NgxSpinnerService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.getAllTestimonial();
  }


  getAllTestimonial(){
    this.spinner.show();
    debugger;
    this.testimonial.getAllTestimonial()
    .subscribe(
      response => {
        this.testimonials =response;
        debugger;
      },err =>{
        //hide spinner 
        this.spinner.hide(); 
        //Toastr
        this.toastr.error(err.message);
        this.toastr.error(err.status);    
      }
    )
    this.spinner.hide();
  }

  ApproveTestimonial(id:any){
    this.spinner.show();
    this.testimonial.ApproveTestimonial(id)
    .subscribe(
      response => {
      },err =>{
        //hide spinner 
        this.spinner.hide();    
      }
    )
    this.toastr.success('Approved Successfully')
    window.location.reload();
    this.spinner.hide();
  }

  UnapproveTestimonial(id:any){
    this.spinner.show();
    this.testimonial.UnapproveTestimonial(id)
    .subscribe(
      response => {
      },err =>{
        //hide spinner 
        this.spinner.hide();    
      }
    )
    this.toastr.success('Unapproved Successfully')
    window.location.reload();
    this.spinner.hide();
  }

}


