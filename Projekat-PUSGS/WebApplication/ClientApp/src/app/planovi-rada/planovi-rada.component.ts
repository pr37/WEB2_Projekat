import { Component } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { HttpClient, HttpHeaders, HttpClientJsonpModule } from '@angular/common/http';
import { Notification, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { BackendServiceService } from '../backend-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'planovi-rada',
  templateUrl: './planovi-rada.component.html',
  styleUrls: ['./planovi-rada.component.css']
})

export class PlanoviRadaComponent implements AfterViewInit, OnInit{
  displayedColumns: string[] = ['ID', 'StartDate', 'PhoneNo', 'Status', 'Address', 'Company','Type', 'Edit'];
  dataSource = new MatTableDataSource<PlanRadaTabela>(ELEMENT_DATA);
  ngOnInit() {
    this.dataSource = new MatTableDataSource<PlanRadaTabela>(ELEMENT_DATA);
  }
  userLoggedIn: boolean;
  isLoggedIn() {
    if (localStorage.getItem('currentUser')) {
      console.log('user is logged in');
      return true;
    }
    console.log('user is not logged in');
    return false;
  }
  constructor(private http: HttpClient,
    private backendService: BackendServiceService, private router: Router) {
    this.userLoggedIn = this.isLoggedIn();
    if (this.userLoggedIn) {
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
    }

  }

  edit(planId) {
    localStorage.setItem('selectedPlan', planId);
    this.router.navigate(['/new-plan-rada']);
  }

  goDoAdd() {
    localStorage.setItem('selectedPlan', '');
    this.router.navigate(['/new-plan-rada']);
  }

  showAll() {
    ELEMENT_DATA.splice(0, ELEMENT_DATA.length);
    this.getPlanovi().subscribe(
      (res: any) => {
        console.log(res);
        res.forEach(not => ELEMENT_DATA.push({ ID: not.planRadaID, StartDate: not.startDate, PhoneNo: not.phoneNo, Status: not.status, Address: not.address, Company: not.company, Type: not.tipRada }));
        this.ngOnInit();
      },
      err => {
        console.log("Err: " + err);
        alert(err);
      }
    )
  }

  showMine() {
    //TODO get logged in users id
    ELEMENT_DATA.splice(0, ELEMENT_DATA.length);
    var id = localStorage.getItem('currentUser');
    this.getMine(id).subscribe(
      (res: any) => {
        console.log(res);
        res.forEach(not => ELEMENT_DATA.push({ ID: not.planRadaID, StartDate: not.startDate, PhoneNo: not.phoneNo, Status: not.status, Address: not.address, Company: not.company, Type: not.tipRada }));
        this.ngOnInit();
      },
      err => {
        console.log("Err: " + err);
        alert(err);
      }
    )
  }

  getUser(id: string) {
    return this.http.get('https://localhost:44301/Podesavanja/user/' + id);
  }

 

  applySearch(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  selectedStatus: string;
  applyFilterStatus() {
    this.selectedStatus = this.selectedStatus.trim(); // Remove whitespace
    this.selectedStatus = this.selectedStatus.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = this.selectedStatus;
  }

  selectedType: string;
  applyFilterType() {
    this.selectedType = this.selectedType.trim(); // Remove whitespace
    this.selectedType = this.selectedType.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = this.selectedType;
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getPlanovi() {
    return this.http.get('https://localhost:44301/PlanoviRada/getall');
  }

  getMine(id: string) {
    return this.http.get('https://localhost:44301/PlanoviRada/getmy/'+id);
  }

}

export interface PlanRadaTabela {
  ID: string;
  StartDate: string;
  PhoneNo: string;
  Status: string;
  Address: string;
  Company: string;
  Type: string;
}

const ELEMENT_DATA: PlanRadaTabela[] = [
  //{ ID: '231', StartDate: '24.4.2021.', PhoneNo: '012434234', Status: 'OK', Address: 'Maje Gojkovic 123', Company: 'ARRT' , Type: 'Planirani'},
  //{ ID: '123', StartDate: '26.4.2021.', PhoneNo: '012434354', Status: 'DRAFT', Address: 'Aleka Vucica 321', Company: 'A33', Type: 'Planirani'},
 // { ID: '123', StartDate: '26.4.2021.', PhoneNo: '012434354', Status: 'DRAFT', Address: 'Aleka Vucica 321', Company: 'A33', Type: 'Neplaniran' },
  //{ ID: '123', StartDate: '26.4.2021.', PhoneNo: '012434354', Status: 'REPLACED', Address: 'Aleka Vucica 321', Company: 'A33', Type: 'Neplaniran' },
  ]
