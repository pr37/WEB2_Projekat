import { AfterViewInit, Component, ViewChild, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpHeaders, HttpClientJsonpModule } from '@angular/common/http';
import { Notification, of } from 'rxjs';
import { catchError,  tap } from 'rxjs/operators';
import { BackendServiceService } from '../backend-service.service';

@Component({
  selector: 'bezbednosni-dokumenti',
  templateUrl: './bezbednosni-dokumenti.component.html',
  styleUrls: ['./bezbednosni-dokumenti.component.css']
})

export class BezbednosniDokumentiComponent implements OnInit, AfterViewInit{
  Type: string;
  PlanRada: string = 'temp';
  Status: string = 'DRAFT'
  Username: string = 'temp';
  Ekipa: string = 'temp';
  Detalji: string = "";
  Beleske: string = "";
  TelBroj: string = "";
  CreatedOn: string = new Date().toUTCString();
  
  mainWindow: string = 'START';
  whatToShow: string = "ShowBasic";  
  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar, private http: HttpClient, private backendService: BackendServiceService) {
    
  }

  ngOnInit() {

  }

  ngAfterViewInit() {

  }

  showBasic(): void{
    this.whatToShow = 'ShowBasic';
  }
  showHistory(): void{
    this.whatToShow = 'ShowHistory';
  }
  showInstruction(): void{
    this.whatToShow = 'ShowInstruction';
  }
  showDevices(): void{
    this.whatToShow = 'ShowDevices';
  }
}
