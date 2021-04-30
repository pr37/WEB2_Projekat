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
  displayedColumns: string[] = ['id', 'name', 'type', 'kordinate', 'adresa', 'obrisi'];
  displayedModalColumns:string[] = ['id', 'name', 'type', 'kordinate', 'adresa', 'izbor'];  
  podaciTabele = new MatTableDataSource<Oprema>();          
  svaOprema = new MatTableDataSource<Oprema>(OPREMA); 
  opremaToAdd: Oprema;
  brojac: number = 0;


  constructor() {    
    this.opremaToAdd = new Oprema();           
  }
  
  dodajOpremu(element: Oprema): void{
    if(this.podaciTabele.data.indexOf(element) != -1){
      alert('izabrana oprema je ved dodata!');
      return;
    }
    this.podaciTabele.data.push(element);
    this.podaciTabele.filter = '';
  }

  obrisiOpremu(element: Oprema): void{
    this.podaciTabele.data.splice(this.podaciTabele.data.indexOf(element), 1);
    this.podaciTabele.filter = '';
  }

  @ViewChild(MatPaginator) set matModalPaginator( modalPaginator: MatPaginator){    
    this.svaOprema.paginator = modalPaginator;    
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

  inicijalizujModalTabelu(){
    this.svaOprema.filter = '';    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.podaciTabele.filter = filterValue.trim().toLowerCase();
  }
  applyModalFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.svaOprema.filter = filterValue.trim().toLowerCase();
  }
}

export class Oprema {
  id: number;
  name: string;
  type: string;  
  kordinate: string;
  adresa: string;  
  
  constructor(id: number = 0, name: string = '', type: string = '', kordinate: string = '', adresa: string = ''){
    this.id = id;
    this.name = name;
    this.type = type;
    this.kordinate = kordinate;
    this.adresa = adresa;
  }
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