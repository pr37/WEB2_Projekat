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
import { split } from 'ts-node';

@Component({
  selector: 'podesavanja',
  templateUrl: './podesavanja.component.html',
  styleUrls: ['./podesavanja.component.css']
})

export class PodesavanjaComponent implements OnInit{
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

  ngOnInit() {
    this.getUser(this.loggedInId).subscribe(
      (res: any) => {
        console.log(res);
        if (res[0].role != 'admin') {
          this.isAdmin = false;
        } else {
          this.isAdmin = true;
        }
      },
      err => {
        console.log("Err: " + err);
        alert('Could not get user.');
      }
    )
    this.getPodesavanja().subscribe(
      (res: any) => {
        console.log(res);
        this.Error = res.errorVisible;
        this.Warning = res.warningVisible;
        this.Info = res.infoVisible;
        this.Success = res.successVisible;
        this.HideFields = res.hideRequiredFields;
      },
      err => {
        console.log("Err: " + err);
        alert('Could not get podesavanja.');
      }
    )

    this.streets = [];
    this.getUlice().subscribe(
      (res: any) => {
        this.streets.splice(0, this.streets.length);
        console.log(res);
        res.forEach(st => this.streets.push(st));
      },
      err => {
        console.log("Err: " + err);
        alert('Could not get user.');
      }
    )

    
    this.getRequests().subscribe(
      (res: any) => {
        console.log(res);
        ELEMENT_DATA.splice(0, ELEMENT_DATA.length);
        res.forEach(r => ELEMENT_DATA.push({ Request: r }));
      },
      err => {
        console.log("Err: " + err);
        alert('Could not get requested roles.');
      }
    )
    this.dataSource = new MatTableDataSource<ApprovalsTabela>(ELEMENT_DATA);
  }

  displayedColumns: string[] = ['Requests', 'Approve'];
  dataSource = new MatTableDataSource<ApprovalsTabela>(ELEMENT_DATA);

  constructor(private http: HttpClient)  {
    this.Error = false;
    this.Warning = false;
    this.Info = false;
    this.Success = false;
    this.HideFields = false;
    this.userLoggedIn = false;
    this.userLoggedIn = this.isLoggedIn();
    if (this.userLoggedIn) {
      this.NewPassword = '';
      this.hide = true;
      //TODO get values
      //TODO get set notifications
      //this.isAdmin = true;
     // this.ngOnInit();
      this.streets = [];
      this.getUlice().subscribe(
        (res: any) => {
          console.log(res);
          this.streets.splice(0, this.streets.length);
          res.forEach(st => this.streets.push(st));
        },
        err => {
          console.log("Err: " + err);
          alert('Could not get user.');
        }
      )
      this.loggedInId = localStorage.getItem('currentUser');
      this.getUser(this.loggedInId).subscribe(
        (res: any) => {
          console.log(res);
          console.log(this.loggedInId);
          if (res[0].role != 'admin') {
            this.isAdmin = false;
          } else {
            this.isAdmin = true;
          }
        },
        err => {
          console.log("Err: " + err);
          alert('Could not get user.');
        }
      )
      this.getPodesavanja().subscribe(
        (res: any) => {
          console.log(res);
          this.Error = res.errorVisible;
          this.Warning = res.warningVisible;
          this.Info = res.infoVisible;
          this.Success = res.successVisible;
          this.HideFields = res.hideRequiredFields;
        },
        err => {
          console.log("Err: " + err);
          alert('Could not get podesavanja.');
        }
      )
      ELEMENT_DATA.splice(0, ELEMENT_DATA.length);
      this.getRequests().subscribe(
        (res: any) => {
          console.log(res);
          ELEMENT_DATA.splice(0, ELEMENT_DATA.length);
          res.forEach(r => ELEMENT_DATA.push({ Request: r }));
        },
        err => {
          console.log("Err: " + err);
          alert('Could not get requested roles.');
        }
      )
    }
  }

  approve(request) {
    var splitted = request.split("~", 6);
    console.log(splitted)
    this.postRequest(splitted[1],splitted[5]).subscribe(
      (res: any) => {
        console.log(res);
        alert('Role approved.');
        this.ngOnInit();
      },
      err => {
        console.log("Err: " + err);
        alert('Could not approve role.');
      }
    )
    this.ngOnInit();
  }

  getUser(id: string) {
    console.log('https://localhost:44301/Podesavanja/user/' + id);
    return this.http.get('https://localhost:44301/Podesavanja/user/' + id);
    
  }

  getPodesavanja() {
    return this.http.get('https://localhost:44301/Podesavanja/getPodesavanja');
  }

  getUlice() {
    return this.http.get('https://localhost:44301/Podesavanja/getStreets');
  }

  getRequests() {
    return this.http.get('https://localhost:44301/Podesavanja/getRequestedRole');
  }

  postPrioritet(street, prioritet) {
    return this.http.post('https://localhost:44301/Podesavanja/setPrioritet/' + street + '/' + prioritet.toString(),null);
  }

  postPassword(password) {
    return this.http.post('https://localhost:44301/Podesavanja/setPassword/' + this.loggedInId + '/' + password, null);
  }

  postRequest(id,requested) {
    return this.http.post('https://localhost:44301/Podesavanja/approveRole/' + id + '/' + requested, null);
  }

  addPodesavanja() {
    //set/{error}/{warning}/{info}/{success}/{hide}
    return this.http.post('https://localhost:44301/Podesavanja/set/' + this.Error.toString() + '/' + this.Warning.toString() + '/' + this.Info.toString() + '/' + this.Success.toString() + '/' + this.HideFields.toString(),null);
  }

  isLoggedIn():boolean {
    if (localStorage.getItem('currentUser')) {
      console.log('user is logged in');
      return true;
    }
    console.log('user is not logged in');
    return false;
  }

  changePassword(): void {
    if (this.NewPassword == '') {
      alert('Enter a password.');
      return;
    }
    this.postPassword(this.NewPassword).subscribe(
      (res: any) => {
        console.log(res);
        alert('Password changed.');
      },
      err => {
        console.log("Err: " + err);
        alert('Could not reset password.');
      }
    )
  }

  setPriority(): void {
    console.log(this.Street + " " + this.Priority);
    if (this.Street == "none") {
      alert('Select a street to set priority.');
      return;
    }
    this.postPrioritet(this.Street, this.Priority).subscribe(
      (res: any) => {
        console.log(res);
        alert('Prioritet setovan.');
      },
      err => {
        console.log("Err: " + err);
        alert('Could not set prioritet.');
      }
    )
  }

  valueChangeError( $event) {
    //set the two-way binding here for the specific unit with the event
    this.Error = $event.checked;
  }
  valueChangeWarning($event) {
    //set the two-way binding here for the specific unit with the event
    this.Warning = $event.checked;
    console.log(this.Warning);
  }

  valueChangeInfo($event) {
    //set the two-way binding here for the specific unit with the event
    this.Info = $event.checked;
  }
  valueChangeSuccess($event) {
    //set the two-way binding here for the specific unit with the event
    this.Success = $event.checked;
  }
  valueChangeHide($event) {
    //set the two-way binding here for the specific unit with the event
    this.HideFields = $event.checked;
  }
  setNotifications(): void {
    console.log(this.Warning);
    this.addPodesavanja().subscribe(
      (res: any) => {
        console.log(res);
       
      },
      err => {
        console.log("Err: " + err);
        alert('Could not set new settings.');
      }
    )
  }


  resetDefault(): void {
    this.Error = false;
    this.Warning = false;
    this.Info = false;
    this.Success = false;
    this.HideFields = false;
    this.addPodesavanja().subscribe(
      (res: any) => {
        console.log(res);

      },
      err => {
        console.log("Err: " + err);
        alert('Could not set new settings.');
      }
    )
   // this.ngOnInit();
  }
}

export interface ApprovalsTabela {
  Request: string;
}

const ELEMENT_DATA: ApprovalsTabela[] = [
]
