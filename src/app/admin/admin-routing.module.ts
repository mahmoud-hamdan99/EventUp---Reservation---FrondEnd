import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateHallComponent } from './create-hall/create-hall.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EventdetailComponent } from './eventdetail/eventdetail.component';
import { HallGalleryComponent } from './hall-gallery/hall-gallery.component';
import { LocationComponent } from './location/location.component';
import { ManageAboutComponent } from './manage-about/manage-about.component';
import { ManageAdminComponent } from './manage-admin/manage-admin.component';
import { ManageContactComponent } from './manage-contact/manage-contact.component';
import { ManageEventComponent } from './manage-event/manage-event.component';
import { ManageHallComponent } from './manage-hall/manage-hall.component';
import { ManageReportComponent } from './manage-report/manage-report.component';
import { ManageRoleComponent } from './manage-role/manage-role.component';
import { ManageTestimonialComponent } from './manage-testimonial/manage-testimonial.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ManageWebsiteComponent } from './manage-website/manage-website.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { UserdetailComponent } from './userdetail/userdetail.component';
import { ViewPaymentComponent } from './view-payment/view-payment.component';


const routes: Routes = [
 {
   path:'',
   component:StatisticsComponent
 },

 

{
  path:'users',
  component:ManageUsersComponent

},
{
  path:'userdetail/:id',
  component:UserdetailComponent
},
{
  path:'roles',
  component:ManageRoleComponent

},
{
  path:'admins',
  component:ManageAdminComponent

},
{
  path:'manageWebsite',
  component:ManageWebsiteComponent
},
{
  path:'reviews',
  component:ReviewsComponent
},
{
  path:'manageAbout',
  component:ManageAboutComponent
},
{
  path:'location',
  component:LocationComponent
},
{
  path:'manageHall',
  component:ManageHallComponent
},
{
path:'createHall',
component:CreateHallComponent
},
{
  path:'hallGallery/:id',
  component:HallGalleryComponent
},
{
  path:'manageEvent',
  component:ManageEventComponent
  },
  {
    path:'eventdetail/:id',
    component:EventdetailComponent
  },
  {
    path:'allPayment',
    component:ViewPaymentComponent
  },
  {
    path: 'manageReport',
    component: ManageReportComponent
  },
  {
    path: 'manageTestimonal',
    component: ManageTestimonialComponent
  },
  {
    path: 'manageContact',
    component: ManageContactComponent
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
