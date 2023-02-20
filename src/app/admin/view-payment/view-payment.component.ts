import { Component, OnInit } from '@angular/core';
import { PaymentService } from 'src/app/Services/payment.service';

@Component({
  selector: 'app-view-payment',
  templateUrl: './view-payment.component.html',
  styleUrls: ['./view-payment.component.css']
})
export class ViewPaymentComponent implements OnInit {

  constructor(public pay:PaymentService) { }

  ngOnInit(): void {
    this.pay.GetAllPayment();
  }

}
