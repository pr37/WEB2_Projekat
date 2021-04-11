import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Resenje } from '../../../../../modeli-podataka/resenje';

@Component({
  selector: 'app-resenje',
  templateUrl: './resenje.component.html',
  styleUrls: ['./resenje.component.css']
})
export class ResenjeComponent implements OnInit {
  trenutniUzrok: string = '';
  resenje: Resenje;
  resenjeForm: FormGroup;

  listaUzroka = new Array<string>();      
  listaPoduzroka = new Array<string>();  
  listaTipKonstrukcije = new Array<string>();      
  listaMaterijal = new Array<string>();  

  constructor() { 
    this.resenje = {} as Resenje;

    this.resenjeForm = new FormGroup({
      'uzrok': new FormControl(),
      'poduzrok': new FormControl(),
      'tipKonstrukcije': new FormControl(),
      'materijal' : new FormControl()
    });

    this.listaUzroka.push("vreme");
    this.listaUzroka.push("ljudski faktor");
    this.listaUzroka.push("otkaz opreme");

    this.listaTipKonstrukcije.push("podzemna");
    this.listaTipKonstrukcije.push("nadzema");

    this.listaMaterijal.push("metal");
    this.listaMaterijal.push("plastika");
    this.listaMaterijal.push("staklo");
  }

  ngOnInit(): void {
  }

  changeUzrok(): void{
    if(this.trenutniUzrok === 'vreme')  
    {
      this.listaPoduzroka = [];
      this.listaPoduzroka.push('grmljavina');
      this.listaPoduzroka.push('uragan');
      this.listaPoduzroka.push('vetar');
      this.listaPoduzroka.push('grad');
      this.listaPoduzroka.push('zemljotres');
      this.listaPoduzroka.push('poplava');
    }  
    else if(this.trenutniUzrok === 'ljudski faktor')
    {
      this.listaPoduzroka = [];
      this.listaPoduzroka.push('losa instalacija');
      this.listaPoduzroka.push('kolateralna steta');
      this.listaPoduzroka.push('vandalizam');
    }
    else if(this.trenutniUzrok === 'otkaz opreme')
    {
      this.listaPoduzroka = [];
      this.listaPoduzroka.push('mehanicki lom');
      this.listaPoduzroka.push('termicki prekid');      
    }
  }

  onSubmit() {
    console.log(this.resenjeForm.value);    
    //console.log(this.osnovneInformacijeForm);
  }

  onClear() { 
    this.resenjeForm.reset(); 
    this.listaPoduzroka = [];
  }

}
