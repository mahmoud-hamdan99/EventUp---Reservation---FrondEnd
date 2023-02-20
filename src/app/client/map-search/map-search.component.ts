import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MapService } from 'src/app/Services/map.service';

@Component({
  selector: 'app-map-search',
  templateUrl: './map-search.component.html',
  styleUrls: ['./map-search.component.css']
})
export class MapSearchComponent implements OnInit {

  constructor(public maps:MapService,private router:Router) { }
  p:number=1;
  model:any={}
  searchhall:any;
  searchcounty:any;
  searchcity:any;
  image="https://cdn-icons-png.flaticon.com/24/148/148839.png"
  ngOnInit(): void { 
    this.maps.gethallLoocation();
  }

  openEventReserve(id:any){
   
    this.router.navigate([`client/reserveevent/${id}`]);

  }
  openHallDetails(id:any){
    
    this.router.navigate([`client/hallDetails/${id}`]);

  }

  keyDownFunctionCountry(event:any) {
    if (event.keyCode === 13) {
      this.SearchbyCounty();
    }
  }

  keyDownFunctionCity(event:any) {
    if (event.keyCode === 13) {
      this.Searchbycity();
    }
  }

  keyDownFunctionName(event:any) {
    if (event.keyCode === 13) {
      this.Searchbyname();
    }
  }


  SearchbyCounty(){
    if(this.searchcounty== "" && this.searchhall == "" && this.searchcity == ""){
      this.ngOnInit();
    }
    else if(this.searchcounty== "" && this.searchhall != ""){
      this.Searchbyname();
    }
    else if(this.searchcounty== "" && this.searchcity != ""){
      this.Searchbycity();
    }
    else if(this.searchcity != "" || this.searchhall != "")
    {
      this.maps.allHallLocation=this.maps.allHallLocation.filter((res:any) =>{
        return (res.country.toLocaleLowerCase()).match(this.searchcounty.toLocaleLowerCase())
      });
    }
    else{
      
      this.maps.gethallLoocation();
      setTimeout(() => {
        this.maps.allHallLocation=this.maps.allHallLocation.filter((res:any) =>{
          return (res.country.toLocaleLowerCase()).match(this.searchcounty.toLocaleLowerCase())
        })
        }, 1500);
       
  }
  }


  Searchbycity(){
    if(this.searchcity== "" && this.searchhall == "" && this.searchcounty == ""){
      this.ngOnInit();
    }
    else if(this.searchcity== "" && this.searchhall != ""){
      this.Searchbyname();
    }
    else if(this.searchcity== "" && this.searchcounty != ""){
      this.SearchbyCounty();
    }
    else if(this.searchcounty != "" || this.searchhall != "")
    {
      this.maps.allHallLocation=this.maps.allHallLocation.filter((res:any) =>{
        return (res.city.toLocaleLowerCase()).match(this.searchcity.toLocaleLowerCase())
      });
    }
    else{
      this.maps.gethallLoocation();
      setTimeout(() => {
        this.maps.allHallLocation=this.maps.allHallLocation.filter((res:any) =>{
          return (res.city.toLocaleLowerCase()).match(this.searchcity.toLocaleLowerCase())
        })
        }, 1500);
       
  }
  }


  Searchbyname(){
    
    if(this.searchhall== "" && this.searchcity == "" && this.searchcounty == ""){
      this.ngOnInit();
    }
    else if(this.searchhall== "" && this.searchcity != ""){
      this.Searchbycity();
    }
    else if(this.searchhall== "" && this.searchcounty != ""){
      this.SearchbyCounty();
    }
    else if(this.searchcity != "" || this.searchcounty != "")
    {
      this.maps.allHallLocation=this.maps.allHallLocation.filter((res:any) =>{
        return (res.hallname.toLocaleLowerCase()).match(this.searchhall.toLocaleLowerCase())
      });
    }
    else{
      this.maps.gethallLoocation();

      setTimeout(() => {
        this.maps.allHallLocation=this.maps.allHallLocation.filter((res:any) =>{
          return (res.hallname.toLocaleLowerCase()).match(this.searchhall.toLocaleLowerCase())
        })
        }, 1500);
       
  }
}
 



}
