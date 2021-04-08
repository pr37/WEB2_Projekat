import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PocetnaStranicaComponent } from './components/2-1/pocetna-stranica/pocetna-stranica.component';
import { PregledIncidenataComponent } from './components/2-5-1/pregled-incidenata/pregled-incidenata.component';
import { TabelaIncidenataComponent } from './components/2-5-1/tabela-incidenata/tabela-incidenata.component';

@NgModule({
  declarations: [
    AppComponent,
    PocetnaStranicaComponent,
    PregledIncidenataComponent,
    TabelaIncidenataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
