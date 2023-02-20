
import { Overlay } from '@angular/cdk/overlay';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { EventService } from 'src/app/Services/event.service';
import { HallService } from 'src/app/Services/hall.service';


@Component({
  selector: 'app-reserve-event',
  templateUrl: './reserve-event.component.html',
  styleUrls: ['./reserve-event.component.css']
})
export class ReserveEventComponent implements OnInit {

  addEventForm: FormGroup = new FormGroup({
    Eventtype: new FormControl('', Validators.required),
    NoPerson: new FormControl('', [Validators.required, Validators.min(0), Validators.max(this.hall.singleHall.capacity)]),
    Startdate: new FormControl('', Validators.required),
    Enddate: new FormControl('', Validators.required),
    fullname: new FormControl('', Validators.required),
    ccv: new FormControl('', Validators.required),
    Expirededate: new FormControl('', Validators.required),
    Cardnumber: new FormControl('', [Validators.required, Validators.pattern("^(?:4[0-9]{12}(?:[0-9]{3})?|(?:5[1-5][0-9]{2}| 222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\d{3})\d{11})$")]),
    Cardname: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required)


  })

  totalDays: any = 0;
  totalhours: any = 0;
  totalDates: any;
  totalPrice: any;
  public selectedField = "";
  userrole:any;
  jwtHelper = new JwtHelperService();
  @ViewChild('callConfrimDialog') callDeleteDialog!: TemplateRef<any>

  constructor(private route: ActivatedRoute, public hall: HallService,private router:Router,public event: EventService,private toastr: ToastrService) { }
  ngOnInit(): void {
    const user = localStorage.getItem('token')?.toString();
    debugger;
    if(user!=null){
      const decodetoken=this.jwtHelper.decodeToken(user);
      this.userrole=decodetoken.role;
      }
      if (this.userrole=='MainAdmin'|| this.userrole=='Admin') {
        this.router.navigate(['accessforbidden/403']);
     }

    this.hall.getHallById(this.route.snapshot.params['id']);
  }

  onFocus(identifier: string) {
    this.selectedField = identifier;
  }

  onBlur() {
    this.selectedField = "";
  }
  totalDate(eDate: any, sDate: any) {
    let newDate = new Date(eDate);
    let newDate1 = new Date(sDate);
    var Time = newDate.getTime() - newDate1.getTime();

    var Days = Math.floor(Time / (1000 * 3600 * 24));
    var time = Math.floor((Time % 86400000) / 3600000);
    var date = Time / (1000 * 3600 * 24);

    this.totalDays = Days
    this.totalhours = time
    this.totalDates = date

  }

  calTotalPrice(price: any,sale:any) {
    let newPrice = parseInt(price);
    this.totalPrice = Math.floor(newPrice * this.totalDates);

    let theSale = parseInt(sale);
    if(theSale > 0){
      this.totalPrice = this.totalPrice - theSale
    }
  }

  submit() {
    debugger
    let model = this.addEventForm.value;
    if(model.NoPerson <= this.hall.singleHall.capacity){

      const user = localStorage.getItem('token')?.toString();
      const decodetoken = this.jwtHelper.decodeToken(user);
      const userid = decodetoken.nameid;
      console.log(this.addEventForm.value)
      debugger
      this.event.addEvent(this.addEventForm.value, userid, this.hall.singleHall.hallid, this.totalPrice)

      
    }
    else{
      this.toastr.warning('Number Of Person Is More Than Hall Capacity');
    }
    
  }



}
