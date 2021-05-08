import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AgmCoreModule } from '@agm/core';

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
    NewPotrosacDialog
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
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
  providers: [{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },],
  bootstrap: [AppComponent]
})
export class AppModule { }
