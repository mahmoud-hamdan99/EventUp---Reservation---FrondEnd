import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { ReportIntervalDTO } from '../models/report-interval.model';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  url = environment.baseUrl;
  reportInterval: ReportIntervalDTO[] = [];
  constructor(private http: HttpClient, public spinner: NgxSpinnerService) { }
  downloadPdf() {

    return this.http.get(this.url + "Report/GenerateUserReport", { observe: 'response', responseType: 'blob' });
  }

  searchBetweenTwoDateReport(dates: any) {
   
    return this.http.get(this.url + "Report/GeneratePDF", { observe: 'response', responseType: 'blob', params: dates });

  }


}
