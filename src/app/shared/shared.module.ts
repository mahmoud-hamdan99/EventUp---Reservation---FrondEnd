import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import {MatButtonModule} from '@angular/material/button';
import { MatDialogModule} from '@angular/material/dialog';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {NgxPaginationModule} from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';





@NgModule({
  declarations: [
    NavBarComponent,
    FooterComponent,
    
    

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule,
    NgxSpinnerModule,
    MatButtonModule,
    MatDialogModule,
    MatButtonToggleModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
 

  
   
   
    
  ],
  exports:[
    NavBarComponent,
    FooterComponent,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FooterComponent,
    NgxSpinnerModule,
    MatButtonModule,
    MatDialogModule,
    MatButtonToggleModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
  

   
       
  ]


})
export class SharedModule { }
