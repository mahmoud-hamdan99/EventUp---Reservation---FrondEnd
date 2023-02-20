import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientRoutingModule } from './client-routing.module';
import { CompTestomonialComponent } from './comp-testomonial/comp-testomonial.component';
import { SharedModule } from '../shared/shared.module';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { HallComponent } from './hall/hall.component';
import { SingleHallComponent } from './single-hall/single-hall.component';
import { AgmCoreModule } from '@agm/core';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { ReserveEventComponent } from './reserve-event/reserve-event.component';
import { TestomonialComponent } from './testomonial/testomonial.component';
import { MapSearchComponent } from './map-search/map-search.component';




@NgModule({
  declarations: [
    AboutusComponent,
    ContactusComponent,
    CompTestomonialComponent,
    HallComponent,
    SingleHallComponent,
    ThankyouComponent,
    ReserveEventComponent,
    TestomonialComponent,
    MapSearchComponent

  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    SharedModule,
    AgmCoreModule.forRoot({
      apiKey:"AIzaSyAVfLvU8_hHyxGq3R7Ty9xLhF9gwCeHWZA"
    })
  ]
})
export class ClientModule { }
