import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Incident } from '../../modeli-podataka/incident';
import { INCIDENTI } from '../../podaci/mock-incidenti';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {

  constructor() { }

  getIncidente(): Observable<Incident[]> {
    const incidenti = of(INCIDENTI);
    return incidenti;    
  }
}
