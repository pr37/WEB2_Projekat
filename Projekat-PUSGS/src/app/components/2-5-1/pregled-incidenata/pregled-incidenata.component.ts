import { Component, OnInit } from '@angular/core';

import { Incident } from '../../../modeli-podataka/incident';
import { IncidentService } from '../../../servisi/incident/incident.service';

@Component({
  selector: 'app-pregled-incidenata',
  templateUrl: './pregled-incidenata.component.html',
  styleUrls: ['./pregled-incidenata.component.css']
})
export class PregledIncidenataComponent implements OnInit {

  incidenti: Incident[] = [];

  constructor(private incidentService: IncidentService) { }

  ngOnInit(): void {
    this.getIncidente();
  }

  getIncidente(): void {    
    this.incidentService.getIncidente().subscribe(incidenti => this.incidenti = incidenti);    
  }

}
