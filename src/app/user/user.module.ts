import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { SharedModule } from '../shared/shared.module';
import { CardComponent } from './Add-card/card.component';
import { ProfileasideComponent } from './profileaside/profileaside.component';
import { ViewCardComponent } from './view-card/view-card.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { MyreservationComponent } from './myreservation/myreservation.component';



@NgModule({
  declarations: [
    UserprofileComponent,
    CardComponent,
    ProfileasideComponent,
    ViewCardComponent,
    ChangepasswordComponent,
    MyreservationComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
  
  ]
})
export class UserModule { }
