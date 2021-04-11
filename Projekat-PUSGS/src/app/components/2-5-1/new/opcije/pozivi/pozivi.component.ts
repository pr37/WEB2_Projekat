import { Component, OnInit } from '@angular/core';

import { Poziv } from '../../../../../modeli-podataka/poziv';
import { PozivService } from '../../../../../servisi/poziv/poziv.service';

@Component({
  selector: 'app-pozivi',
  templateUrl: './pozivi.component.html',
  styleUrls: ['./pozivi.component.css']
})
export class PoziviComponent implements OnInit {
  pozivi: Poziv[] = [];  

  constructor(private pozivService: PozivService) { }

  ngOnInit(): void {
    this.pozivService.getPozive().subscribe(pozivi => this.pozivi = pozivi);            
  }

}
