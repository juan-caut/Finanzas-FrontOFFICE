import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { PageComponent } from './component/panel/page/page.component';

const routes: Routes = [
  {
    path:'login',
  component:LoginComponent,
  },
{
  path:'panel',
  component:PageComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
