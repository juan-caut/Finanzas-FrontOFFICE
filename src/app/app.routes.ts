import { Router, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { TabpanelComponent } from './pages/tabpanel/tabpanel.component';
import { CarteraComponent } from './pages/component/cartera/cartera.component';
import { AuthGuard } from './auth.guard';


export const routes: Routes = [
  { path: 'home', component: TabpanelComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'signin', component: SignupComponent },
  { path: 'panel', component: TabpanelComponent,canActivate: [AuthGuard] },
  { path: '**', pathMatch: 'full', redirectTo: 'login' },
];
