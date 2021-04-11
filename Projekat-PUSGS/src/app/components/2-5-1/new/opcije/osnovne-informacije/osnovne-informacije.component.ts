import { Component, OnInit, Input } from '@angular/core';
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
      'etaDate' : new FormControl(),
      'etaTime' : new FormControl('13:00'),      
      'ataDate' : new FormControl(),
      'ataTime' : new FormControl('13:00'),      
      'etrDate' : new FormControl(),
      'etrTime' : new FormControl('13:00'),
      'afektovaniPotrosaci' : new FormControl(),
      'brojPoziva' : new FormControl(),
      'nivoNapona' : new FormControl(),
      'pvrDate' : new FormControl(),
      'pvrTime' : new FormControl('13:00'),
      'dodeliSebiResavanje' : new FormControl()
    });

    this.lisaTipova.push("option1");
    this.lisaTipova.push("option2");
    this.lisaTipova.push("option3");  
    this.lisaStatusa.push("izbor1");
    this.lisaStatusa.push("izbor2");
    this.lisaStatusa.push("izbor3"); 
  }

  ngOnInit(): void { this.initFormOsnovneInformacije(); }

  private initFormOsnovneInformacije() {}
 
  onSubmit() {
    console.log(this.osnovneInformacijeForm.value);
    //console.log(this.osnovneInformacijeForm);
  }

  onClear() { this.osnovneInformacijeForm.reset(); }
}
