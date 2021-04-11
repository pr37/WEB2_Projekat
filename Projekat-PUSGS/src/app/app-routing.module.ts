import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PocetnaStranicaComponent } from './components/2-1/pocetna-stranica/pocetna-stranica.component';
import { PregledIncidenataComponent } from './components/2-5-1/pregled-incidenata/pregled-incidenata.component';
import { NewComponent } from './components/2-5-1/new/new.component';
import { OsnovneInformacijeComponent } from './components/2-5-1/new/opcije/osnovne-informacije/osnovne-informacije.component';

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
    path: 'pregled_incidenata', 
    children: [
      { path: '', component: PregledIncidenataComponent},            
      { path: 'new', component: NewComponent},
    ]     
  },    
  { path: 'pregled_incidenata/new/osnovne_informacije', component: OsnovneInformacijeComponent}, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }