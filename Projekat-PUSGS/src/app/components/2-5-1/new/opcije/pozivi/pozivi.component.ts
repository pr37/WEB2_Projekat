import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Poziv } from '../../../../../modeli-podataka/poziv';
import { PozivService } from '../../../../../servisi/poziv/poziv.service';

@Component({
  selector: 'app-pozivi',
  templateUrl: './pozivi.component.html',
  styleUrls: ['./pozivi.component.css']
})
export class PoziviComponent implements OnInit {
  tempara: boolean = true;
  pozivi: Poziv[] = [];  
  prozorNewCall: boolean = false;
  poziv: Poziv;    
  pozivForm: FormGroup;   
  listaRazloga = new Array<string>();      

  constructor(private pozivService: PozivService) { 
    this.poziv = {} as Poziv;

    this.pozivForm = new FormGroup({
      'razlog': new FormControl(),
      'komentar': new FormControl(),
      'uzrok': new FormControl(),
      'prioritet' : new FormControl(),
      'idPotrosaca' : new FormControl()
    });

    this.listaRazloga.push("Nema struje");
    this.listaRazloga.push("Postoji Kvar");
    this.listaRazloga.push("Treperenje svetla");
    this.listaRazloga.push("Povratak struje");
    this.listaRazloga.push("Delimicna struja");
    this.listaRazloga.push("Problemi sa naponom");
  }

  ngOnInit(): void {
    this.pozivService.getPozive().subscribe(pozivi => this.pozivi = pozivi);            
  }

  setNewCall(): void{
    this.prozorNewCall = true;
  }

  onSubmit(): void{

  }

  onClear(): void{
    
  }

  izaberiPotrosaca(): void{

  }
}
