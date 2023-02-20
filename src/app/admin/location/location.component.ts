import { Component, OnInit } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  title: string = 'AGM project';
  latitude: number=0;
  longitude: number=0;
  zoom:number=0;

  constructor() { }

  ngOnInit(): void {
  }
  
  onMapClicked(event: any){
    console.table(event.coords);
    this.latitude = event.coords.lat;
    this.longitude = event.coords.lng;
  }
   
 

}
