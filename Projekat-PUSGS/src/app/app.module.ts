import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input'
import {MatRippleModule} from '@angular/material/core'; 
import {MatFormFieldModule} from '@angular/material/form-field';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PocetnaStranicaComponent } from './components/2-1/pocetna-stranica/pocetna-stranica.component';
import { PregledIncidenataComponent } from './components/2-5-1/pregled-incidenata/pregled-incidenata.component';
import { TabelaIncidenataComponent } from './components/2-5-1/tabela-incidenata/tabela-incidenata.component';
import { FilterComponent } from './components/2-5-1/filter/filter.component';
import { NewComponent } from './components/2-5-1/new/new.component';
import { OsnovneInformacijeComponent } from './components/2-5-1/new/opcije/osnovne-informacije/osnovne-informacije.component';
import { PoziviComponent } from './components/2-5-1/new/opcije/pozivi/pozivi.component';
import { OpremaComponent } from './components/2-5-1/new/opcije/oprema/oprema.component';
import { ResenjeComponent } from './components/2-5-1/new/opcije/resenje/resenje.component';

@NgModule({
  declarations: [
    AppComponent,
    PocetnaStranicaComponent,
    PregledIncidenataComponent,
    TabelaIncidenataComponent,
    FilterComponent,
    NewComponent,
    OsnovneInformacijeComponent,
    PoziviComponent,
    OpremaComponent,
    ResenjeComponent,      
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,       
    MatInputModule,    
    MatRippleModule,
    MatFormFieldModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
