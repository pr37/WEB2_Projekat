import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { OsnovneInformacije } from '../../../../../modeli-podataka/osnovne-informacije';

@Component({
  selector: 'app-osnovne-informacije',
  templateUrl: './osnovne-informacije.component.html',
  styleUrls: ['./osnovne-informacije.component.css']
})
export class OsnovneInformacijeComponent implements OnInit {
  osnovneInformacije: OsnovneInformacije;    
  osnovneInformacijeForm: FormGroup;   
  lisaTipova = new Array<string>();      
  lisaStatusa = new Array<string>();      

  constructor() {  
    this.osnovneInformacije = {} as OsnovneInformacije;      

    this.osnovneInformacijeForm = new FormGroup({
      'id': new FormControl(),
      'tip': new FormControl(),
      'prioritet': new FormControl(),
      'potvrdjen' : new FormControl(),
      'status' : new FormControl(),
      'eta' : new FormControl(),
      'ata' : new FormControl(),
      'etr' : new FormControl(),
      'afektovaniPotrosaci' : new FormControl(),
      'brojPoziva' : new FormControl(),
      'nivoNapona' : new FormControl(),
      'pvr' : new FormControl(),
      'dodeliSebiResavanje' : new FormControl()
    });

    this.lisaTipova.push("option1");
    this.lisaTipova.push("option2");
    this.lisaTipova.push("option3");  
    this.lisaStatusa.push("izbor1");
    this.lisaStatusa.push("izbor2");
    this.lisaStatusa.push("izbor3"); 
  }

  ngOnInit(): void {      
    this.initFormOsnovneInformacije();
  }

  private initFormOsnovneInformacije() {    

  }
 
  onSubmit() {
    console.log(this.osnovneInformacijeForm.value);
    //console.log(this.osnovneInformacijeForm);
  }

  onClear() {
    this.osnovneInformacijeForm.reset();
  }

}
