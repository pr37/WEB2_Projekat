import { Component } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'podesavanja',
  templateUrl: './podesavanja.component.html',
  styleUrls: ['./podesavanja.component.css']
})

export class PodesavanjaComponent {
  isAdmin: boolean;
  hide: boolean;
  NewPassword: string;
  Street: string;
  Priority: string;
  streets: string[];
  Error: boolean;
  Warning: boolean;
  Success: boolean;
  Info: boolean;
  HideFields: boolean;
  constructor() {
    this.NewPassword = '';
    this.hide = true;
    //TODO get values
    //TODO get set notifications
    this.isAdmin = true;
    this.streets = [];
    this.streets.push('asd');
    this.streets.push('dsa');
    this.streets.push('wer');
  }

  changePassword(): void {
    //TODO get user id, newpwd, send to DB
  }

  setPriority(): void {
    console.log(this.Street + " " + this.Priority);
  }

  setNotifications(): void {
    console.log(this.Error + " " + this.Warning);
    //TODO send this to DB and implement in notifications
  }

  hideFields(): void {
    //TODO send to DB and implement in new document
  }

  resetDefault(): void {
    //TODO all notifications, all fields
  }
}
