import { Component, OnInit, Input } from '@angular/core';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

import { Incident } from '../../../modeli-podataka/incident';

@Component({
  selector: 'app-tabela-incidenata',
  templateUrl: './tabela-incidenata.component.html',
  styleUrls: ['./tabela-incidenata.component.css']
})
export class TabelaIncidenataComponent implements OnInit, AfterViewInit {
  @Input() incidentiZaPrikaz: Incident[] = [];
  displayedColumns: string[] = ['id', 'startDate', 'phoneNum', 'status', 'adresa'];  
  podaciTabele = new MatTableDataSource<Incident>(INCIDENTI);          

  //@ViewChild(MatPaginator) paginator: MatPaginator;
  //@ViewChild(MatSort) sort: MatSort;

  
  @ViewChild(MatPaginator) set matPaginator( paginator: MatPaginator){
    this.podaciTabele.paginator = paginator;
  }
  
  @ViewChild(MatSort) set matSort( sort: MatSort){
    this.podaciTabele.sort = sort;
  }
  
  ngOnInit(){
  }

  ngAfterViewInit() { 
    //this.podaciTabele.paginator = this.paginator;      
    //this.podaciTabele.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.podaciTabele.filter = filterValue.trim().toLowerCase();
  }
}


const INCIDENTI: Incident[] = [  
  { id: 12, startDate: '1996, 11, 17', phoneNum: 485018911848501891184850189118, status: 'Zabelezen', adresa: 'Ive Andrica 213'},  
  { id: 13, startDate: '1997, 11, 17', phoneNum: 4850189118, status: 'Zabelezen', adresa: 'Ive Andrica 213'},  
  { id: 14, startDate: '1998, 11, 17', phoneNum: 4850189118, status: 'ZabelezenZabelezenZabelezenZabelezenZabelezen', adresa: 'Ive Andrica 213'},    
  { id: 16, startDate: '1996, 11, 17', phoneNum: 4850189118, status: 'Zabelezen', adresa: 'Ive Andrica 213'},  
  { id: 17, startDate: '1997, 11, 17', phoneNum: 4850189118, status: 'Zabelezen', adresa: 'Ive AndricaAndricaAndricaAndricaAndricaAndricaAndricaAndricaAndrica 213'},  
  { id: 18, startDate: '1998, 11, 17', phoneNum: 4850189118, status: 'Zabelezen', adresa: 'Ive Andrica 213'},    
  { id: 20, startDate: '1996, 11, 17', phoneNum: 4850189118, status: 'Zabelezen', adresa: 'Ive Andrica 213'},  
  { id: 21, startDate: '1997, 11, 17', phoneNum: 4850189118, status: 'Zabelezen', adresa: 'Ive Andrica 213'},  
  { id: 22, startDate: '1998, 11, 17', phoneNum: 4850189118, status: 'Zabelezen', adresa: 'Ive Andrica 213'},    
  { id: 24, startDate: '1996, 11, 17', phoneNum: 4850189118, status: 'Zabelezen', adresa: 'Ive Andrica 213'},  
  { id: 25, startDate: '1997, 11, 17', phoneNum: 4850189118, status: 'Zabelezen', adresa: 'Ive Andrica 213'},  
  { id: 26, startDate: '1998, 11, 17', phoneNum: 4850189118, status: 'Zabelezen', adresa: 'Ive Andrica 213'},  
]

