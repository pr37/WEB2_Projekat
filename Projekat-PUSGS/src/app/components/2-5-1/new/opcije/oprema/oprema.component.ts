import { Component, AfterViewInit, ViewChild, Inject } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-oprema',
  templateUrl: './oprema.component.html',
  styleUrls: ['./oprema.component.css']
})
export class OpremaComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'type', 'kordinate', 'adresa'];  
  podaciTabele = new MatTableDataSource<Oprema>();          
  mojiPodaci = new MatTableDataSource<Oprema>(OPREMA);            
  brojac: number = 0;

  constructor() {}

  @ViewChild(MatPaginator) set matPaginator( paginator: MatPaginator){
    this.podaciTabele.paginator = paginator;
    this.mojiPodaci.paginator = paginator;
  }
  
  /*@ViewChild(MatSort) set matSort( sort: MatSort){
    this.podaciTabele.sort = sort;
    this.mojiPodaci.sort = sort;
  }*/ 

  ngAfterViewInit() { 
    //this.podaciTabele.paginator = this.paginator;      
    //this.podaciTabele.sort = this.sort;
    this.podaciTabele.filter = '';    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.podaciTabele.filter = filterValue.trim().toLowerCase();
  }

  addToList(){   
    if(this.brojac > OPREMA.length -2)
      return; 
    this.podaciTabele.data.push(OPREMA[this.brojac]);    
    this.brojac = this.brojac +1;
    this.podaciTabele.filter = '';  
  }
}

export interface Oprema {
  id: number;
  name: string;
  type: string;  
  kordinate: string;
  adresa: string;  
}

const OPREMA: Oprema[] = [  
  { id: 11, name: 'PRE1', type: 'prekidac', kordinate: "44°29'22.8N 20°00'41.3E", adresa: 'adresa1'},  
  { id: 12, name: 'PRE2', type: 'prekidac', kordinate: "41°29'22.8N 20°00'41.3E", adresa: 'adresa2'},  
  { id: 13, name: 'PRE3', type: 'prekidac', kordinate: "46°29'22.8N 20°00'41.3E", adresa: 'adresa3'},  
  { id: 14, name: 'OSI1', type: 'osigurac', kordinate: "34°29'22.8N 20°00'41.3E", adresa: 'adresa4'},  
  { id: 15, name: 'OSI2', type: 'osigurac', kordinate: "24°29'22.8N 20°00'41.3E", adresa: 'adresa1'},  
  { id: 16, name: 'OSI3', type: 'osigurac', kordinate: "14°29'22.8N 20°00'41.3E", adresa: 'adresa2'},  
  { id: 17, name: 'TRA1', type: 'transformator', kordinate: "44°29'22.8N 20°00'41.3E", adresa: 'adresa3'},  
  { id: 18, name: 'TRA2', type: 'transformator', kordinate: "44°29'22.8N 20°00'41.3E", adresa: 'adresa4'},  
  { id: 19, name: 'DIS1', type: 'diskonektor', kordinate: "40°29'22.8N 20°00'41.3E", adresa: 'adresa5'},  
]