import { Component, OnInit } from '@angular/core';

import { Incident } from '../../../modeli-podataka/incident';
import { IncidentService } from '../../../servisi/incident/incident.service';

@Component({
  selector: 'app-pregled-incidenata',
  templateUrl: './pregled-incidenata.component.html',
  styleUrls: ['./pregled-incidenata.component.css']
})
export class PregledIncidenataComponent implements OnInit {

  prikaziFilter: boolean = false;
  selektovanaOpcija: string = 'all';
  incidenti: Incident[] = [];  
  mojiIncidenti: Incident[] = [];
  filtriraniIncidenti: Incident[] = [];
  incidentiZaPrikaz: Incident[] = [];

  constructor(private incidentService: IncidentService) { }

  ngOnInit(): void {
    this.incidentService.getIncidente().subscribe(incidenti => this.incidenti = incidenti);        
    this.incidentiZaPrikaz = this.incidenti;
  }  

  getMineIncidente(): void {      
    this.incidentiZaPrikaz = [];
    this.selektovanaOpcija = 'mine';      
  }

  getAllIncidente(): void {  
    this.incidentiZaPrikaz = this.incidenti;
    this.selektovanaOpcija = 'all';      
  }

  setFilter(): void{
    this.prikaziFilter = !this.prikaziFilter;
  }

}
