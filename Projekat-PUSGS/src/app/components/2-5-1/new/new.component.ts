import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  izabranaOpcija: string = 'osnovna_informacija'; 

  constructor() { }

  ngOnInit(): void {
  }

  setIzabranaOpcijaOsnovnaInformacija(): void{
    this.izabranaOpcija = 'osnovna_informacija';
  }
  setIzabranaOpcijaOprema1(): void{
    this.izabranaOpcija = 'oprema1';
  }
  setIzabranaOpcijaResenja(): void{
    this.izabranaOpcija = 'resenje';
  }
  setIzabranaOpcijaPozivi(): void{
    this.izabranaOpcija = 'pozivi';
  }
  setIzabranaOpcijaEkipa(): void{
    this.izabranaOpcija = 'ekipa';
  }
  setIzabranaOpcijaMPrilozi(): void{
    this.izabranaOpcija = 'mprilozi';
  }
  setIzabranaOpcijaOprema2(): void{
    this.izabranaOpcija = 'oprema2';
  }
}
