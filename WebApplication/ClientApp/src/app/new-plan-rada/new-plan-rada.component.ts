import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'new-plan-rada',
  templateUrl: './new-plan-rada.component.html',
  styleUrls: ['./new-plan-rada.component.css']
})

export class NewPlanRadaComponent implements OnInit{

 // Status: string;
  Status : 'DRAFT';
  IncidentID: 'TestID';
  CreatedBy: string;
  PhoneNo: string;
  Company: string;
  Purpose: string;
  Details: string;
  Notes: string;

  control = new FormControl();
  svrhe: string[] = ['Popravka 123', 'Zamena 22', 'Instalacija ...', 'Provera ...'];
  filteredSvrhe: Observable<string[]>;

  ngOnInit() {
    this.filteredSvrhe = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.svrhe.filter(svrha => this._normalizeValue(svrha).indexOf(filterValue) !== -1);
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }
}
