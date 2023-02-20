import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HallService } from 'src/app/Services/hall.service';

@Component({
  selector: 'app-hall',
  templateUrl: './hall.component.html',
  styleUrls: ['./hall.component.css']
})
export class HallComponent implements OnInit {

  nameSearch:any;
  usageSearch:any;
  capacitySearch:number=0;
  priceSearch:number=0;
  p:number=1;
  constructor(public hall:HallService,private router:Router) { }

  ngOnInit(): void {
    this.getAllHalls();
  }
  openEventReserve(id:any){
   
    this.router.navigate([`client/reserveevent/${id}`]);

  }

  getAllHalls(){
    if(this.hall.allHalls.length == 0)
    {
      this.hall.getAllHalls();
    }
  }


  openHallDetails(id:any){
    
    this.router.navigate([`client/hallDetails/${id}`]);

  }

  keyDownFunction(event:any) {
    if (event.keyCode === 13) {
      this.search();
    }
  }

  search(){
    if(this.nameSearch != "" && this.nameSearch != null)
    {
      this.hall.getHallByName(this.nameSearch.toLocaleLowerCase());
    }
    else if(this.usageSearch != "" && this.usageSearch != null)
    {
      this.hall.getHallByUsage(this.usageSearch.toLocaleLowerCase());
    }
    else if(this.capacitySearch != 0 && this.capacitySearch != null)
    {
      this.hall.getHallByCapicity(this.capacitySearch);
    }
    else if(this.priceSearch != 0 && this.priceSearch != null)
    {
      this.hall.getHallByPrice(this.priceSearch);
    }
    else{
      this.ngOnInit();
    }
  }

}
