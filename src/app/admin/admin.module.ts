import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { UserdetailComponent } from './userdetail/userdetail.component';
import { ManageRoleComponent } from './manage-role/manage-role.component';
import { SharedModule } from '../shared/shared.module';
import { ManageAdminComponent } from './manage-admin/manage-admin.component';
import { CreateAdminComponent } from './create-admin/create-admin.component';
import { ManageWebsiteComponent } from './manage-website/manage-website.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { ManageAboutComponent } from './manage-about/manage-about.component';
import { ManageContactComponent } from './manage-contact/manage-contact.component';
import { ManageTestimonialComponent } from './manage-testimonial/manage-testimonial.component';
import { AgmCoreModule } from '@agm/core';
import { LocationComponent } from './location/location.component';
import { ManageHallComponent } from './manage-hall/manage-hall.component';
import { EditHallComponent } from './edit-hall/edit-hall.component';
import { CreateHallComponent } from './create-hall/create-hall.component';
import { HallGalleryComponent } from './hall-gallery/hall-gallery.component';
import { ViewPaymentComponent } from './view-payment/view-payment.component';
import { EventdetailComponent } from './eventdetail/eventdetail.component';
import { ManageEventComponent } from './manage-event/manage-event.component';
import { ManageReportComponent } from './manage-report/manage-report.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';


@NgModule({
  declarations: [
   DashboardComponent,
   ManageUsersComponent,
   UserdetailComponent,
   ManageRoleComponent,
   ManageAdminComponent,
   CreateAdminComponent,
   ManageWebsiteComponent,
   ReviewsComponent,
   ManageAboutComponent,
   ManageContactComponent,
   ManageTestimonialComponent,
   LocationComponent,
   ManageHallComponent,
   EditHallComponent,
   CreateHallComponent,
   HallGalleryComponent,
   ViewPaymentComponent,
   EventdetailComponent,
   ManageEventComponent,
   ManageReportComponent,
   StatisticsComponent,
   
   



  ],
  imports: [
    CommonModule,
    AdminRoutingModule, 
    SharedModule,
    AgmCoreModule.forRoot({
      apiKey:"AIzaSyAVfLvU8_hHyxGq3R7Ty9xLhF9gwCeHWZA"
    }),
    NgxGalleryModule

   
   
  ]
})
export class AdminModule { }


