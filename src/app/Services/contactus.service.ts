import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contact } from '../models/Contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactusService {

  constructor(private spinner:NgxSpinnerService,private toastr :ToastrService,private http:HttpClient,private router:Router ) { }
  url:any=environment.baseUrl;
  
  getAllContacts():Observable<Contact[]>{
    return this.http.get<Contact[]>(this.url+'Contactus/GetAllContacts');
  }


  deleteContact(id:number){
    return this.http.delete(this.url+'Contactus/DeleteContact/'+id);
  }

  createContact(contact: any) {
    this.spinner.show();
    this.http.post(this.url + 'Contactus/AddContact/', contact)
      .subscribe((res: any) => {
        this.spinner.hide();
        this.toastr.success('The team will contact you as soon as possible')
        this.router.navigate(['client']);
      }, err => {
        this.spinner.hide();
        this.toastr.error(err.message, err.status)
      })

  }

  



}
