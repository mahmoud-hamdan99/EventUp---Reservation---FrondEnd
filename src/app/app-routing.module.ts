import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { ClientModule } from './client/client.module';
import { ForbiddenPageComponent } from './forbidden-page/forbidden-page.component';
import { NotFoundComponentComponent } from './not-found-component/not-found-component.component';
import { UserModule } from './user/user.module';
import { AuthGuard } from './_guards/guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => AuthModule

  },
  {
    path: 'admin',
    loadChildren: () => AdminModule,
    canActivate: [AuthGuard]
  },
  {
    path: 'user',
    loadChildren: () => UserModule,
    canActivate: [AuthGuard]


  },

  {
    path: 'client',
    loadChildren: () => ClientModule
  },
  {
    path: '',
    loadChildren: () => ClientModule
  },
  {
    path: 'accessforbidden/403',
    component: ForbiddenPageComponent
  },
  {
    path: '**',
    component: NotFoundComponentComponent
  },


];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
