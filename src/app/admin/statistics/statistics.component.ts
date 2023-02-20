import { Component, OnInit } from '@angular/core';
import { StatisticsService } from 'src/app/Services/statistics.service';
import {Chart, registerables } from 'chart.js'

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  constructor(public statistics : StatisticsService) {
    Chart.register(...registerables )
   }

  chart:any =[];
  result:any =[];

  // bar Chart
  month:any;
  noOfEventM:any;

  // Doughnut Chart
  type:any;
  noOfHalls:any;

  // Pie Chart
  age:any;
  customersCount:any;

  // Second Cards Row
  noOfAllEvents:number=0;
  noOfPendingEvents:number=0;
  noOfAcceptedEvents:number=0;
  noOfRejectedEvents:number=0;
  

  // First Cards Row 
  noOfUsers:number=0;
  totalHalls:number=0;
  monthlyEarnings:number=0;
  annualEarnings:number=0;


  ngOnInit() {

    // Second Cards Row
    this.statistics.EventsCountStatus().then((res) => {
      this.result.data = res;
    
      this.noOfAllEvents = this.result.data.map((data:any) => data.totalEvent)
      this.noOfPendingEvents = this.result.data.map((data:any) => data.pendingEvent)
      this.noOfAcceptedEvents = this.result.data.map((data:any) => data.acceptedEvent)
      this.noOfRejectedEvents = this.result.data.map((data:any) => data.rejectedEvent)
    })

    // First Cards Row 
    this.statistics.GetEarnings().then((res) => {
      this.result.data = res;
     
      this.noOfUsers = this.result.data.map((data:any) =>data.totalUsers )
      this.totalHalls = this.result.data.map((data:any) =>data.totalHalls )
      this.monthlyEarnings = this.result.data.map((data:any) => data.monthlyEarnings)
      this.annualEarnings = this.result.data.map((data:any) => data.annualEarnings)

    })


    // bar Chart
    this.statistics.EventsCountMonths().then((res) => {
      this.result.data = res;

      console.log(this.result)
      this.month = this.result.data.map((data:any) => data.month)
      this.noOfEventM = this.result.data.map((data:any) => data.reservationCount)

      this.chart = new Chart('canvas', {
        type: 'bar',
        data: {
          labels: this.month,
          datasets: [{
              label: '# of Reservations',
              data: this.noOfEventM,
              borderWidth: 1,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)',
                'rgba(201, 99, 132, 0.2)',
                'rgba(54, 159, 64, 0.2)',
                'rgba(80, 205, 86, 0.2)',
                'rgba(75, 205, 192, 0.2)',
                'rgba(54, 162, 86, 0.2)'
              ],
              borderColor: '#14b9a8'
          }]
      },
      })
    })


    // Doughnut Chart
    this.statistics.HallsCountUsage().then((res) => {
      this.result.data = res;
      console.log(this.result)
      this.type = this.result.data.map((data:any) => data.type)
      this.noOfHalls = this.result.data.map((data:any) => data.noOfHalls)

      this.chart = new Chart('canvas1', {
        type: 'doughnut',
        data: {
          labels: this.type,
          datasets: [{
              data: this.noOfHalls,
              borderWidth: 1,
              backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)',
                '#36eb40'
              ],
              borderColor: '#14b9a8',
              hoverOffset: 10
          }]
      },
      })
    })


    // Pie Chart
    this.statistics.UserCountOnAge().then((res) => {
      this.result.data = res;
      console.log(this.result)
      this.age = this.result.data.map((data:any) => data.age)
      this.customersCount = this.result.data.map((data:any) => data.customersCount)

      this.chart = new Chart('canvas2', {
        type: 'pie',
        data: {
        labels: this.age,
          datasets: [{
              label: '# of halls by usage',
              data: this.customersCount,
              borderWidth: 1,
              backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)',
                '#36eb40'
              ],
              borderColor: '#14b9a8',
              hoverOffset: 10
          }]
      },
      })
    })



  
  
  
  }

}
