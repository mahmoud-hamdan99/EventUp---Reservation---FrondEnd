import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CardService } from 'src/app/Services/card.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  AddCard:FormGroup=new FormGroup({
    Cardnumber:new FormControl(),
    Ccv:new FormControl(),
    Expirededate:new FormControl(),
    Cardtype:new FormControl(),
  })
  
  
  constructor(private card:CardService,public user:UserService) { }

  ngOnInit(): void {
  }

  addCard(){
    this.card.addNewCard(this.AddCard.value)
  }

}
