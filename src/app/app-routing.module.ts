import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MomentAddComponent } from './moment-add/moment-add.component';
import { MomentListComponent } from './moment-list/moment-list.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'moment-list', component: MomentListComponent },
  { path: 'add-moment', component: MomentAddComponent },
  { path: 'moment/:id', component: MomentAddComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
