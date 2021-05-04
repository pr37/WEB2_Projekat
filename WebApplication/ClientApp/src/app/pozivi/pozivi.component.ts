import { Component } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'pozivi',
  templateUrl: './pozivi.component.html',
  styleUrls: ['./pozivi.component.css']
})

export class PoziviComponent {
  signedIn: boolean;
  imePrezime: string;
  Problem: string;
  Adresa: string;
  ImePrezimeUser: string;
  AdresaUser: string;
  constructor() {
    //TODO get user
    this.signedIn = true;
  }

  addCall():void {

  }
}
