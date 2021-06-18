import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { HttpClient, HttpHeaders, HttpClientJsonpModule } from '@angular/common/http';
import { Notification, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { BackendServiceService } from '../backend-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-pregled-incidenata',
  templateUrl: './pregled-incidenata.component.html',
  styleUrls: ['./pregled-incidenata.component.css']
})
export class PregledIncidenataComponent implements AfterViewInit, OnInit{  
  displayedColumns: string[] = ['id', 'startDate', 'phoneNum', 'status', 'adresa'];
  dataSource = new MatTableDataSource<IncidentiTabela>(INCIDENTI);

  ngOnInit() {
    this.dataSource = new MatTableDataSource<IncidentiTabela>(INCIDENTI);
  }
  userLoggedIn: boolean;
  isLoggedIn() {
    return true;
    /*
    if (localStorage.getItem('currentUser')) {
      console.log('user is logged in');
      return true;
    }
    console.log('user is not logged in');
    return false;
    */
  } 
  constructor(private http: HttpClient, private backendService: BackendServiceService, private router: Router) {
    this.userLoggedIn = this.isLoggedIn();
    if (this.userLoggedIn) {
      this.ngOnInit();
      /*
      this.getPlanovi().subscribe(
        (res: any) => {
          console.log(res);
          ELEMENT_DATA.splice(0, ELEMENT_DATA.length);
          res.forEach(not => ELEMENT_DATA.push({ ID: not.planRadaID, StartDate: not.startDate, PhoneNo: not.phoneNo, Status: not.status, Address: not.address, Company: not.company, Type: not.tipRada }));
          this.ngOnInit();
        },
        err => {
          console.log("Err: " + err);
          alert(err);
        }
      )
      */
    }    
  }

  getMineIncidente(): void {          
  }

  getAllIncidente(): void {      
  }

  setFilter(): void{
  }

  goDoAdd() {    
    this.router.navigate(['/new-incident']);
  }

  selectedStatus: string;
  applyFilterStatus() {
    this.selectedStatus = this.selectedStatus.trim(); // Remove whitespace
    this.selectedStatus = this.selectedStatus.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = this.selectedStatus;
  }

  applySearch(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}

export interface IncidentiTabela {
  id: number;
  startDate: string;
  phoneNum: number;
  status: string;
  adresa: string;
}

export const INCIDENTI: IncidentiTabela[] = [  
  { id: 12, startDate: '1996, 11, 17', phoneNum: 4850189118, status: 'DRAFT', adresa: 'Ive Andrica 213Ive Andrica 213Ive Andrica 213Ive Andrica 213Ive Andrica 213Ive Andrica 213Ive Andrica 213Ive Andrica 213Ive Andrica 213Ive Andrica 213Ive Andrica 213'},  
  { id: 13, startDate: '1997, 11, 17', phoneNum: 4850189118, status: 'REPLACED', adresa: 'Ive Andrica 213'},  
  { id: 14, startDate: '1998, 11, 17', phoneNum: 4850189118, status: 'OBSOLETE', adresa: 'Ive Andrica 213'},    
  { id: 16, startDate: '1996, 11, 17', phoneNum: 4850189118, status: 'OK', adresa: 'Ive Andrica 213'},  
  { id: 17, startDate: '1997, 11, 17', phoneNum: 4850189118, status: 'DRAFT', adresa: 'Ive Andrica 213'},  
  { id: 18, startDate: '1998, 11, 17', phoneNum: 4850189118, status: 'APPROVED', adresa: 'Ive Andrica 213'},    
  { id: 20, startDate: '1996, 11, 17', phoneNum: 4850189118, status: 'TEMPORARY', adresa: 'Ive Andrica 213'},  
  { id: 21, startDate: '1997, 11, 17', phoneNum: 48501891184850189118485018911848501891184850189118485018911848501891184850189118485018911848501891184850189118485018911848501891184850189118, status: 'Zabelezen', adresa: 'Ive Andrica 213'},  
  { id: 22, startDate: '1998, 11, 17', phoneNum: 4850189118, status: 'TEMPORARY', adresa: 'Ive Andrica 213'},    
  { id: 24, startDate: '1996, 11, 17', phoneNum: 4850189118, status: 'OBSOLETE', adresa: 'Ive Andrica 213'},  
  { id: 25, startDate: '1997, 11, 17', phoneNum: 4850189118, status: 'OK', adresa: 'Ive Andrica 213'},  
  { id: 26, startDate: '1998, 11, 17', phoneNum: 4850189118, status: 'OK', adresa: 'Ive Andrica 213'},  
]
