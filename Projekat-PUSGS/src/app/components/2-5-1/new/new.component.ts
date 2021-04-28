import { Component, OnInit } from '@angular/core';

import { OsnovneInformacije } from '../../../modeli-podataka/osnovne-informacije';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {  
  izabranaOpcija: string = 'osnovna_informacija';  



  constructor() {}

  ngOnInit(): void {         
  }

  setIzabranaOpcijaOsnovnaInformacija(): void{
    this.izabranaOpcija = 'osnovna_informacija';
  }
  setIzabranaOpcijaOprema(): void{
    this.izabranaOpcija = 'oprema';
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
}
