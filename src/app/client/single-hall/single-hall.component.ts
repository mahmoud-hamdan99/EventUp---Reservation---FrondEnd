import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HallService } from 'src/app/Services/hall.service';

@Component({
  selector: 'app-single-hall',
  templateUrl: './single-hall.component.html',
  styleUrls: ['./single-hall.component.css']
})
export class SingleHallComponent implements OnInit {
  latitude: number=0;
  longitude: number=0;
  constructor(public hall:HallService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.hall.getHallById(this.route.snapshot.params['id']);
  }
  submit()
  {
    console.log(this.hall.singleHall.hallid)
    this.hall.getHallImages(this.hall.singleHall.hallid);
  }
  getlocation()
  {
    console.log(this.hall.singleHall.hallid)
    this.hall.getHallByLocction(this.hall.singleHall.hallid);
    this.latitude=this.hall.HallLocation.latitude;
    this.longitude=this.hall.HallLocation.longitude;
    console.log(this.hall.HallLocation.latitude)

  }
  openEventReserve(id:any){
   
    this.router.navigate([`client/reserveevent/${id}`]);

  }

}
