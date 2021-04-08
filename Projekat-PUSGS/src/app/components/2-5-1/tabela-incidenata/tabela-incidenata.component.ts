import { Component, OnInit, Input } from '@angular/core';

import { Incident } from '../../../modeli-podataka/incident';

@Component({
  selector: 'app-tabela-incidenata',
  templateUrl: './tabela-incidenata.component.html',
  styleUrls: ['./tabela-incidenata.component.css']
})
export class TabelaIncidenataComponent implements OnInit {

  @Input() incidentiZaPrikaz: Incident[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
