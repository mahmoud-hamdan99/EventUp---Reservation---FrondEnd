import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CardService } from 'src/app/Services/card.service';


@Component({
  selector: 'app-view-card',
  templateUrl: './view-card.component.html',
  styleUrls: ['./view-card.component.css']
})
export class ViewCardComponent implements OnInit {
  jwtHelper = new JwtHelperService();
  constructor(public card:CardService) { }

  ngOnInit(): void {
    this.getUserCard();
  }

  getUserCard(){
    const user= localStorage.getItem('token')?.toString();
   const decodetoken=this.jwtHelper.decodeToken(user);
    this.card.getUserCard(decodetoken.nameid);     
  }

  deletecard(id:number){
    this.card.deleteCard(id);
  }

}
