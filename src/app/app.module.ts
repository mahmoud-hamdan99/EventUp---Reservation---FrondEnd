import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastNoAnimationModule, ToastrModule } from 'ngx-toastr';
import { AuthService } from './Services/auth.service';
import { UserService } from './Services/user.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './client/home/home.component';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { TokenInterceptor } from './interceptor/interceptorToken';
import { TranslateModule } from '@ngx-translate/core';
import { ForbiddenPageComponent } from './forbidden-page/forbidden-page.component';
import { NotFoundComponentComponent } from './not-found-component/not-found-component.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ForbiddenPageComponent,
    NotFoundComponentComponent
    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    SharedModule,   
    BrowserAnimationsModule,
    ToastNoAnimationModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),

    
    HttpClientModule,
    NgbModule,
    NgxStarRatingModule,
    TranslateModule.forRoot(),

   
   
    
    
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptor,
      multi:true
      
    },
  
  

    AuthService,
    UserService,
    
  ],

  bootstrap: [AppComponent],schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
