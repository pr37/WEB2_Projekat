import { Component } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { HttpClient, HttpHeaders, HttpClientJsonpModule } from '@angular/common/http';
import { Notification, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { BackendServiceService } from '../backend-service.service';

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
  userLoggedIn: boolean;
  loggedInId: string;
  constructor(private http: HttpClient) {
    this.userLoggedIn = this.isLoggedIn();
    if (this.userLoggedIn) {
      this.NewPassword = '';
      this.hide = true;
      //TODO get values
      //TODO get set notifications
      this.isAdmin = true;
      this.streets = [];
      this.streets.push('asd');
      this.streets.push('dsa');
      this.streets.push('wer');
      this.loggedInId = localStorage.getItem('currentUser');
      this.getUser(this.loggedInId).subscribe(
        (res: any) => {
          console.log(res);
         // res.forEach(not => ELEMENT_DATA.push({ ID: not.planRadaID, StartDate: not.startDate, PhoneNo: not.phoneNo, Status: not.status, Address: not.address, Company: not.company, Type: not.tipRada }));

         // this.ngOnInit();
        },
        err => {
          console.log("Err: " + err);
          alert('Could not get user.');
        }
      )
    }
  }

  getUser(id: string) {
    return this.http.get('https://localhost:44301/Podesavanja/user/' + id);
  }

  isLoggedIn() {
    if (localStorage.getItem('currentUser')) {
      console.log('user is logged in');
      return true;
    }
    console.log('user is not logged in');
    return false;
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
