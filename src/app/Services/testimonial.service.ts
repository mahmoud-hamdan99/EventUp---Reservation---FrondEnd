import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Testimonial } from '../models/Testimonial.model';


@Injectable({
  providedIn: 'root'
})
export class TestimonialService {

  constructor(private spinner: NgxSpinnerService, private toastr: ToastrService, private http: HttpClient) { }
  display_Image: any;
  p_Id: any;
  url: any = environment.baseUrl;



  addTestomonial(model: any) {
    const fromData = new FormData();
    fromData.append('Personalname', model.Personalname);
    fromData.append('Feedback', model.Feedback);
    fromData.append('Status', "Unapproved");
    fromData.append('WebsiteId', '1');


    fromData.append('ImageFile', model.fileSource, model.fileSource.name);

    return this.http.post(this.url + "Testimonial/AddTestimonial", fromData).subscribe(() => {

      this.toastr.success("Admin Added Successfully")

    }, error => {
      if(error.status==200)
      this.toastr.success("Opinion Added Successfully")
      else
      this.toastr.error("Failed to Add")
    });
    ;

  }






  getAllTestimonial(): Observable<Testimonial[]> {
    return this.http.get<Testimonial[]>(this.url + 'Testimonial/GetAllTestimonials');
  }

  ApproveTestimonial(id: any) {
    return this.http.get(this.url + 'Testimonial/ApproveTestimonial/' + id);
  }

  UnapproveTestimonial(id: any): Observable<Testimonial[]> {
    return this.http.get<Testimonial[]>(this.url + 'Testimonial/UnapproveTestimonial/' + id);
  }

  getTestimonialApproved(): Observable<Testimonial[]> {
    return this.http.get<Testimonial[]>(this.url + 'Testimonial/GetAllTestimonialApproved');
  }

  uploadTestimonialAttachment(file: FormData) {
    this.spinner.show();
    this.http.post(this.url + 'Testimonial/UploadTestimonialImage', file)
      .subscribe((res: any) => {
        if (res)
          debugger;
        this.spinner.hide();
        this.display_Image = res.imageUrl;
        this.p_Id = res.publicid;
        this.toastr.success('Uploaded Successfully')
      }, err => {
        this.toastr.error(err.message, err.status);
      })

  }


}
