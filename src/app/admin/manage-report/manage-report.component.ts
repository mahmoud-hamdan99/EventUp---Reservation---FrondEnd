import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ReportService } from 'src/app/Services/report.service';

@Component({
  selector: 'app-manage-report',
  templateUrl: './manage-report.component.html',
  styleUrls: ['./manage-report.component.css']
})
export class ManageReportComponent implements OnInit {

  constructor(private dialog: MatDialog, public report: ReportService, public spinner: NgxSpinnerService, public toster: ToastrService) { }

  ngOnInit(): void {
  }

  reportgroup: FormGroup = new FormGroup({
    startDate: new FormControl('', Validators.required),
    endDate: new FormControl('', Validators.required)
  })
  public selectedField = "";
  onFocus(identifier: string) {
    this.selectedField = identifier;
  }

  onBlur() {
    this.selectedField = "";
  }


  ReportInterval: any = {
    startDate: '',
    endDate: ''
  }





  downloadPdf() {

    this.spinner.show();
    this.report.downloadPdf().subscribe(response => {

      let blob: Blob = response.body as Blob;
      let a = document.createElement('a');
      a.download = 'AllUser-Report';
      a.href = window.URL.createObjectURL(blob);
      a.click();

    })
    this.toster.success('success');
    this.spinner.hide();
  }





  searchBetweenTwoDatesReport() {

    this.spinner.show();
    this.report.searchBetweenTwoDateReport(this.reportgroup.value).subscribe(response => {

      if (response.status == 204) {
        this.spinner.hide();
        this.toster.warning('No Event In This Interval');

      } else {
        let blob: Blob = response.body as Blob;
        let a = document.createElement('a');
        a.download = 'Event-Report';
        a.href = window.URL.createObjectURL(blob);
        a.click();
        this.spinner.hide();
        this.toster.success('success');

      }
    })

  }
}
