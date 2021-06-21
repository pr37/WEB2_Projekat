import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AgmCoreModule } from '@agm/core';
import {  HttpClientJsonpModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { NewPlanRadaComponent, DialogOverviewExampleDialog, ImageDialog, InstructionDialog } from './new-plan-rada/new-plan-rada.component';
import { PlanoviRadaComponent } from './planovi-rada/planovi-rada.component';
import { NotifikacijeComponent } from './notifikacije/notifikacije.component';
import { PodesavanjaComponent } from './podesavanja/podesavanja.component';
import { PotrosaciComponent, NewPotrosacDialog } from './potrosaci/potrosaci.component';
import { PoziviComponent } from './pozivi/pozivi.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { DemoMaterialModule } from './material-module';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { BackendServiceService } from './backend-service.service';
import { PregledIncidenataComponent } from './pregled-incidenata/pregled-incidenata.component';
import { NewIncidentComponent, ChoseUserDialog, ChoseDeviceDialog } from './new-incident/new-incident.component';
import { ElementiMrezeComponent } from './elementi-mreze/elementi-mreze.component';
import { BezbednosniDokumentiComponent, ChoseDeviceDialogg } from './bezbednosni-dokumenti/bezbednosni-dokumenti.component';
import { PregledBezbednosnihDokumenata } from './pregled-bezbednosnih-dokumenata/pregled-bezbednosnih-dokumenata.component';


ElementiMrezeComponent
@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    UserProfileComponent,
    PlanoviRadaComponent,
    NewPlanRadaComponent,
    NotifikacijeComponent,
    PodesavanjaComponent,
    PotrosaciComponent,
    PoziviComponent,
    DialogOverviewExampleDialog,
    ImageDialog,
    InstructionDialog,
    NewPotrosacDialog,
    PregledIncidenataComponent,
    NewIncidentComponent,
    ChoseUserDialog,
    ElementiMrezeComponent,
    ChoseDeviceDialog,
    BezbednosniDokumentiComponent,
    ChoseDeviceDialogg,
    PregledBezbednosnihDokumenata
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    HttpClientJsonpModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },    
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'user-profile', component: UserProfileComponent },
      { path: 'planovi-rada', component: PlanoviRadaComponent },
      { path: 'new-plan-rada', component: NewPlanRadaComponent },
      { path: 'notifikacije', component: NotifikacijeComponent },
      { path: 'podesavanja', component: PodesavanjaComponent },
      { path: 'potrosaci', component: PotrosaciComponent },
      { path: 'pozivi', component: PoziviComponent },
      { path: 'incidenti', component: PregledIncidenataComponent },
      { path: 'new-incident', component: NewIncidentComponent },   
      { path: 'elementi-mreze', component: ElementiMrezeComponent },     
      { path: 'bezbednosni-dokumenti', component: BezbednosniDokumentiComponent }, 
      { path: 'pregled-dokumenata', component: PregledBezbednosnihDokumenata },       
    ]),
    BrowserAnimationsModule,
    DemoMaterialModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBv89UcmQax_QW7OguLyUw6Qa2gXPe8E5Q',
      libraries: ['places']
    })
  ],
  entryComponents: [PlanoviRadaComponent], //TODO Login component here
  providers: [{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
    BackendServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
