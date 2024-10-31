import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { TabpanelComponent } from './pages/tabpanel/tabpanel.component';
import { CarteraComponent } from './pages/component/cartera/cartera.component';

export const routes: Routes = [
  { path: 'home', component: TabpanelComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signin', component: SignupComponent },
  { path: 'panel', component: TabpanelComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'login' },
];
