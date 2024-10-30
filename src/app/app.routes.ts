import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { PrincipalComponent } from './pages/principal/principal.component';
import { SignupComponent } from './pages/signup/signup.component';
import { TabpanelComponent } from './pages/tabpanel/tabpanel.component';

export const routes: Routes = [
    {path:'home',component:PrincipalComponent},
    {path:'login',component:LoginComponent},
    {path:'signin',component:SignupComponent},
    {path:'panel',component:TabpanelComponent},
    {path:'**',pathMatch:'full',redirectTo:'login'},

];
