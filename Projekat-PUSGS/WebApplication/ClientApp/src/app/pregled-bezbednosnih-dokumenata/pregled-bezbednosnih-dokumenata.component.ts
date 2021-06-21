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
  selector: 'pregled-bezbednosnih-dokumenata',
  templateUrl: './pregled-bezbednosnih-dokumenata.component.html',
  styleUrls: ['./pregled-bezbednosnih-dokumenata.component.css']
})
export class PregledBezbednosnihDokumenata implements AfterViewInit, OnInit{  
    displayedColumns: string[] = ['id'];
    dataSource = new MatTableDataSource<BezbednosniDokumentTabela>();

    constructor(private http: HttpClient, private backendService: BackendServiceService, private router: Router) {        
        this.ngOnInit();
        this.GetDokumente();
        this.ngAfterViewInit();
    }

    ngOnInit() {
        this.dataSource = new MatTableDataSource<BezbednosniDokumentTabela>(BEZBEDNOSNI_DOKUMENTI);
    }

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }

    goDoAdd() {    
        this.router.navigate(['/bezbednosni-dokumenti']);
    }

    applySearch(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

    GetDokumente() {
      BEZBEDNOSNI_DOKUMENTI.splice(0, BEZBEDNOSNI_DOKUMENTI.length);
        this.getDokumentee().subscribe(
            (res: any) => {          
              res.forEach(not => BEZBEDNOSNI_DOKUMENTI.push({type: not.type,          
                planRada: not.planRada, 
                status: not.status, 
                username: not.username, 
                ekipa: not.ekipa, 
                detalji: not.detalji, 
                beleske: not.beleske, 
                telBroj: not.telBroj, 
                createdOn: not.createdOn, 
                devicesNames: not.devicesNames, 
                check1: not.check1, 
                check2: not.check2, 
                check3: not.check3, 
                check4: not.check4, 
                evaluating: not.evaluating, 
                approved: not.approved, 
                discard: not.discard}));                           
              this.ngAfterViewInit();
            },
            err => {
              console.log("Err: " + err);
              alert(err);
            }
          )
    }

    getDokumentee() {
        return this.http.get('https://localhost:44301/BezbednosniDokumentiInfo/getall');
    }
}
  
export interface BezbednosniDokumentTabela {
    type: string;
    planRada: string;
    status: string;
    username: string;
    ekipa: string; 
    detalji: string; 
    beleske: string; 
    telBroj: string;
    createdOn: string; 
    devicesNames: string; 
    check1: string; 
    check2: string; 
    check3: string; 
    check4: string; 
    evaluating: string; 
    approved: string; 
    discard: string;
  }
  
  export const BEZBEDNOSNI_DOKUMENTI: BezbednosniDokumentTabela[] = []
  