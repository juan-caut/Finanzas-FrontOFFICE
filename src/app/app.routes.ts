import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { PrincipalComponent } from './pages/principal/principal.component';
import { SignupComponent } from './pages/signup/signup.component';

export const routes: Routes = [
    {path:'home',component:PrincipalComponent},
    {path:'login',component:LoginComponent},
    {path:'signin',component:SignupComponent},
    {path:'panel',component:PrincipalComponent},
    {path:'**',pathMatch:'full',redirectTo:'login'},

];
