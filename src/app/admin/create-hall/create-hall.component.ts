import { Component, NgZone, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { HallService } from 'src/app/Services/hall.service';

@Component({
  selector: 'app-create-hall',
  templateUrl: './create-hall.component.html',
  styleUrls: ['./create-hall.component.css']
})
export class CreateHallComponent implements OnInit {
  images: string[] = [];
  imagesRead: string[] = [];
  latitude: number = 31.963158;
  longitude: number = 35.930359;
  zoom: number = 8;
  map: any;
  geocoder: any;
  country: any;
  state: any;
  city: any;
  mapClickListener: any;
  addHallForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    capacity: new FormControl('', [Validators.required]),
    waiters: new FormControl('', [Validators.required]),
    sale: new FormControl('', [Validators.required]),
    reservationprice: new FormControl('', [Validators.required]),
    usage: new FormControl('', [Validators.required]),
    rate: new FormControl('', [Validators.required]),
    locationid: new FormControl(''),
    City: new FormControl('', [Validators.required]),
    Country: new FormControl('', [Validators.required]),
    latitude: new FormControl(''),
    longitude: new FormControl(''),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required]),
    hallid: new FormControl(''),
  })


  constructor(private router: Router, private zone: NgZone, public hall: HallService, private dialog: MatDialog, private spinner: NgxSpinnerService, private toster: ToastrService) { }

  ngOnInit(): void {
  }
  get f() {
    return this.addHallForm.controls;
  }

  public selectedField = "";
  onFocus(identifier: string) {
    this.selectedField = identifier;
  }

  onBlur() {
    this.selectedField = "";
  }
  onFileChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();

        reader.onload = (event: any) => {
          console.log('image read--');
          console.log(event.target.result);
          this.imagesRead.push(event.target.result);


        }

        reader.readAsDataURL(event.target.files[i]);
      }
    }
    for (var i = 0; i < event.target.files.length; i++) {
      this.images.push(event.target.files[i]);
      this.addHallForm.patchValue({
        fileSource: this.images
      })



    }
    console.log(this.images)
  }


  mapClick(e: google.maps.Map): void {
    this.map = e;
    this.mapClickListener = this.map.addListener('click', (e: google.maps.MouseEvent) => {
      // console.log(e.latLng.lat(), e.latLng.lng());
      this.latitude = e.latLng.lat();
      this.longitude = e.latLng.lng();
      this.addHallForm.patchValue({ latitude: e.latLng.lat(), longitude: e.latLng.lng() })
    });

  }

  public ngOnDestroy(): void {
    if (this.mapClickListener) {
      this.mapClickListener.remove();
    }
  }



  addNewHall() {
    this.hall.addLocation(this.addHallForm.value)
    setTimeout(() => {
      this.router.navigate(['admin/manageHall']);
    }, 5000);
  }

  submit() {
    this.spinner.show();
    this.addNewHall();

    setTimeout(() => {
      this.spinner.hide();
    }, 5000);


  }

}
