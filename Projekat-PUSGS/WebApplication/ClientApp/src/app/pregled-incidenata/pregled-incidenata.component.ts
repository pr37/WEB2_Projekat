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
  displayedColumns: string[] = ['id', 'incidentPriority', 'calls', 'affCustomers', 'voltage', 'type', 'status', 'createdOn', 'sheduled', 'devicesNames', 'uzrok', 'poduzrok', 'konstrukcija', 'materijal'];
  dataSource = new MatTableDataSource<IncidentiTabela>();  

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
      this.getIncidente('all');
      this.ngAfterViewInit();
    }    
  }

  getIncidente(whatToShow: string) {    
    INCIDENTI.splice(0, INCIDENTI.length);
    if(whatToShow == 'all'){
      this.getAllIncidente().subscribe(
        (res: any) => {          
          res.forEach(not => INCIDENTI.push({incidentID: not.incidentID,          
                                            affCustomers: not.affCustomers, 
                                            voltage: not.voltage, 
                                            incidentPriority: not.incidentPriority, 
                                            createdOn: not.createdOn, 
                                            eTA: not.eTA, 
                                            eTR: not.eTR, 
                                            aTA: not.aTA, 
                                            sheduled: not.sheduled, 
                                            type: not.type, 
                                            status: not.status, 
                                            calls: not.calls, 
                                            confirmed: not.confirmed, 
                                            toMe: not.toMe, 
                                            devicesNames: not.devicesNames, 
                                            uzrok: not.uzrok, 
                                            poduzrok: not.poduzrok, 
                                            konstrukcija: not.konstrukcija, 
                                            materijal: not.materijal}));                           
          this.ngAfterViewInit();
        },
        err => {
          console.log("Err: " + err);
          alert(err);
        }
      )
    }
    else if(whatToShow == 'mine'){
      this.getMineIncidente().subscribe(
        (res: any) => {          
          res.forEach(not => INCIDENTI.push({incidentID: not.incidentID,          
            affCustomers: not.affCustomers, 
            voltage: not.voltage, 
            incidentPriority: not.incidentPriority, 
            createdOn: not.createdOn, 
            eTA: not.eTA, 
            eTR: not.eTR, 
            aTA: not.aTA, 
            sheduled: not.sheduled, 
            type: not.type, 
            status: not.status, 
            calls: not.calls, 
            confirmed: not.confirmed, 
            toMe: not.toMe, 
            devicesNames: not.devicesNames, 
            uzrok: not.uzrok, 
            poduzrok: not.poduzrok, 
            konstrukcija: not.konstrukcija, 
            materijal: not.materijal}));                           
          this.ngAfterViewInit();
        },
        err => {
          console.log("Err: " + err);
          alert(err);
        }
      )
    }    
  }

  getAllIncidente() {   
    return this.http.get('https://localhost:44301/FullIncident/getall');
  }

  getMineIncidente() {   
    return this.http.get('https://localhost:44301/FullIncident/getmain');
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
  incidentID: string;
  affCustomers: string; 
  voltage: string;
  incidentPriority: string;
  createdOn: string;
  eTA: string;
  eTR: string;
  aTA: string;
  sheduled: string;
  type: string;
  status: string;
  calls: string;
  confirmed: string;
  toMe: string;
  devicesNames: string;
  uzrok: string;
  poduzrok: string;
  konstrukcija: string;
  materijal: string;
}

export const INCIDENTI: IncidentiTabela[] = []