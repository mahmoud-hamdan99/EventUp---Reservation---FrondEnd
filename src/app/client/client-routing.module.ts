import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutusComponent } from './aboutus/aboutus.component';
import { CompTestomonialComponent } from './comp-testomonial/comp-testomonial.component';
import { ContactusComponent } from './contactus/contactus.component';
import { HallComponent } from './hall/hall.component';
import { HomeComponent } from './home/home.component';
import { MapSearchComponent } from './map-search/map-search.component';
import { ReserveEventComponent } from './reserve-event/reserve-event.component';
import { SingleHallComponent } from './single-hall/single-hall.component';
import { TestomonialComponent } from './testomonial/testomonial.component';
import { ThankyouComponent } from './thankyou/thankyou.component';

const routes: Routes = [
  {
    path: 'about',
    component: AboutusComponent
  },
  {
    path: 'contact',
    component: ContactusComponent
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'hall',
    component: HallComponent
  },
  {
    path: 'hallDetails/:id',
    component: SingleHallComponent
  },
  {
    path: 'reserveevent/:id',
    component: ReserveEventComponent
  },
  {
    path: 'thankYou',
    component: ThankyouComponent
  },
  {
    path: 'testhome',
    component: TestomonialComponent
  },
  {
    path: 'testomonial',
    component: CompTestomonialComponent
  },
  {
    path: 'searchmap',
    component: MapSearchComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
