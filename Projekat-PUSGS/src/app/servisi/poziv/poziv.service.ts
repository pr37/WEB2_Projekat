import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Poziv } from '../../modeli-podataka/poziv';
import { POZIVI } from '../../podaci/mock-pozivi';

@Injectable({
  providedIn: 'root'
})
export class PozivService {

  constructor() { }

  getPozive(): Observable<Poziv[]> {
    const pozivi = of(POZIVI);
    return pozivi;    
  }
}
