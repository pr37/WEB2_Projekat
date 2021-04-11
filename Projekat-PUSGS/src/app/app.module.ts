import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PocetnaStranicaComponent } from './components/2-1/pocetna-stranica/pocetna-stranica.component';
import { PregledIncidenataComponent } from './components/2-5-1/pregled-incidenata/pregled-incidenata.component';
import { TabelaIncidenataComponent } from './components/2-5-1/tabela-incidenata/tabela-incidenata.component';
import { FilterComponent } from './components/2-5-1/filter/filter.component';
import { NewComponent } from './components/2-5-1/new/new.component';
import { OsnovneInformacijeComponent } from './components/2-5-1/new/opcije/osnovne-informacije/osnovne-informacije.component';
import { PoziviComponent } from './components/2-5-1/new/opcije/pozivi/pozivi.component';

@NgModule({
  declarations: [
    AppComponent,
    PocetnaStranicaComponent,
    PregledIncidenataComponent,
    TabelaIncidenataComponent,
    FilterComponent,
    NewComponent,
    OsnovneInformacijeComponent,
    PoziviComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
