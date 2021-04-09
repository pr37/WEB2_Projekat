import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PocetnaStranicaComponent } from './components/2-1/pocetna-stranica/pocetna-stranica.component';
import { PregledIncidenataComponent } from './components/2-5-1/pregled-incidenata/pregled-incidenata.component';

const routes: Routes = [
  { 
    path: '', 
    redirectTo: '/welcome', 
    pathMatch: 'full' 
  },
  { 
    path: 'welcome', component: PocetnaStranicaComponent 
  },
  {
    path: 'pregled_incidenata', component: PregledIncidenataComponent
  }
  /*
  { 
    path: 'pregled_incidenata', 
    children: [
      { path: '', redirectTo: 'all', pathMatch: 'full' },
      { path: "all", component: PregledIncidenataComponent },
      { path: "mine", component: PregledIncidenataComponent },
    ]     
  },    
  */
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
