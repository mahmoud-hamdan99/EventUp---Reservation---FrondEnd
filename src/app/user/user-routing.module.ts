import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardComponent } from './Add-card/card.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { MyreservationComponent } from './myreservation/myreservation.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { ViewCardComponent } from './view-card/view-card.component';

const routes: Routes = [
{
path:'profile',
component:UserprofileComponent

},
{
  path:'card',
  component:CardComponent
  
},
{
  path:'viewcard',
  component:ViewCardComponent
  
},
{
  path:'changepassword',
  component:ChangepasswordComponent
  
  },
  {
    path:'myreservation',
    component:MyreservationComponent
    
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
