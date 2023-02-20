import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { HallService } from 'src/app/Services/hall.service';

@Component({
  selector: 'app-edit-hall',
  templateUrl: './edit-hall.component.html',
  styleUrls: ['./edit-hall.component.css']
})
export class EditHallComponent implements OnInit {

  editHallForm: FormGroup = new FormGroup({
    hallid: new FormControl(''),
    name: new FormControl('', [Validators.required]),
    capacity: new FormControl('', [Validators.required]),
    waiters: new FormControl('', [Validators.required]),
    sale: new FormControl('', [Validators.required]),
    reservationprice: new FormControl('', [Validators.required]),
    usage: new FormControl('', [Validators.required]),
    rate: new FormControl('', [Validators.required]),
    locationid: new FormControl(''),
  })


  constructor(public hall: HallService, private dialog: MatDialog, private spinner: NgxSpinnerService, private toster: ToastrService) { }

  ngOnInit(): void {
  }

  public selectedField = "";
  onFocus(identifier: string) {
    this.selectedField = identifier;
  }

  onBlur() {
    this.selectedField = "";
  }

  editHall() {
    debugger
    this.hall.updateHall(this.editHallForm.value)
  }




  submit() {
    this.spinner.show();
    this.editHall();

    setTimeout(() => {
      this.spinner.hide();
    }, 3000);
    this.hall.getAllHalls();


  }

}
