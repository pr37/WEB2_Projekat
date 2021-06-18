import { AfterViewInit, Component, ViewChild, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpHeaders, HttpClientJsonpModule } from '@angular/common/http';
import { Notification, of } from 'rxjs';
import { catchError,  tap } from 'rxjs/operators';
import { BackendServiceService } from '../backend-service.service';

export interface Element {
  UserID: string;
  ChangedDate: Date;
}

const ELEMENT_DATA: Element[] = [
];

@Component({
  selector: 'new-incident',
  templateUrl: './new-incident.component.html',
  styleUrls: ['./new-incident.component.css']
})
export class NewIncidentComponent implements OnInit, AfterViewInit {  
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA); 

  displayedColumnsCall: string[] = ['id', 'razlog', 'uzrok', 'komentar'];
  dataSourceCall = new MatTableDataSource<PozivTabela>();   

  dataSourceUser = new MatTableDataSource<UserTabela>();

  displayedColumnsOpreme: string[] = ['id', 'name', 'type', 'adresa'];
  dataSourceOprema = new MatTableDataSource<OpremaTabela>();
  dataSourceOpremaSva = new MatTableDataSource<OpremaTabela>();

  whatToShow: string;  
  IncidentID: string;
  AffCustomers: string;
  Voltage: string;  
  IncidentPriority: string;
  CreatedOn: string;   
  ETA: Date;
  ETR: Date;
  ATA: Date;
  Sheduled: Date;
  Type: string;
  Status: string = 'DRAFT';
  Calls: string = 'temp';
  Confirmed: boolean = false;
  ToMe: boolean = false;

  Uzrok: string = "";
  Poduzrok: string;
  Konstrukcija: string;
  Materijal: string;

  prozorNewCall: boolean = false;
  
  Razlog: string;
  UzrokPoziva: string;      
  Komentar: string;

  UserID: string = "";
  UserIme: string;
  UserPrezime: string;
  UserAdresa: string;
  UserPrioritet: string;

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
  listaUzroka = new Array<string>();
  listaPoduzroka = new Array<string>();  
  listaTipKonstrukcije = new Array<string>();      
  listaMaterijal = new Array<string>();  
  listaRazloga = new Array<string>();
  listaKvareva = new Array<string>();  
  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar, private http: HttpClient, private backendService: BackendServiceService) {
    //if (this.userLoggedIn) 
    
      this.getNewIncidentId().subscribe(
        (res: any) => {          
          this.IncidentID = res;              
        },
        err => {
          console.log("Err: " + err);
          alert(err);
        }
      )      

    this.listaUzroka.push("vreme");
    this.listaUzroka.push("ljudski faktor");
    this.listaUzroka.push("otkaz opreme");

    this.listaTipKonstrukcije.push("podzemna");
    this.listaTipKonstrukcije.push("nadzema");

    this.listaMaterijal.push("metal");
    this.listaMaterijal.push("plastika");
    this.listaMaterijal.push("staklo");  

    this.CreatedOn = new Date().toLocaleDateString();    

    this.userLoggedIn = this.isLoggedIn();   
    //this.IncidentID = 'tempId';
    this.IncidentPriority = 'tempPrio';

    this.listaRazloga.push("Nema struje");
    this.listaRazloga.push("Postoji kvar");
    this.listaRazloga.push("Treperenje svetla");
    this.listaRazloga.push("Povratak struje");
    this.listaRazloga.push("Delimicna struja");
    this.listaRazloga.push("Problemi sa naponom");

    this.listaKvareva.push("neodredjen");
    this.listaKvareva.push("istopljen uredjaj");
    this.listaKvareva.push("prekinut kontakt");    

    this.whatToShow = 'ShowBasic';       
  }

  getNewIncidentId(){
    return this.http.get('https://localhost:44301/Incident/getnewid');
  }

  changeUzrok(): void{
    console.log('click: ' + this.Uzrok);

    if(this.Uzrok === 'vreme')  
    {
      this.listaPoduzroka = [];
      this.listaPoduzroka.push('grmljavina');
      this.listaPoduzroka.push('uragan');
      this.listaPoduzroka.push('vetar');
      this.listaPoduzroka.push('grad');
      this.listaPoduzroka.push('zemljotres');
      this.listaPoduzroka.push('poplava');
    }  
    else if(this.Uzrok === 'ljudski faktor')
    {
      this.listaPoduzroka = [];
      this.listaPoduzroka.push('losa instalacija');
      this.listaPoduzroka.push('kolateralna steta');
      this.listaPoduzroka.push('vandalizam');
    }
    else if(this.Uzrok === 'otkaz opreme')
    {
      this.listaPoduzroka = [];
      this.listaPoduzroka.push('mehanicki lom');
      this.listaPoduzroka.push('termicki prekid');      
    }
  }

  ngOnInit(): void {         
    this.dataSourceCall = new MatTableDataSource<PozivTabela>(POZIVI); 
    this.dataSourceUser = new MatTableDataSource<UserTabela>(KORISNICI);
    this.dataSourceOprema = new MatTableDataSource<OpremaTabela>(OPREMA_izabrana);
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;  
  @ViewChild(MatPaginator) paginatorCall: MatPaginator;  
  @ViewChild(MatSort) sortCall: MatSort;  
  ngAfterViewInit() {
    this.dataSourceCall.paginator = this.paginatorCall;
    this.dataSourceCall.sort = this.sortCall;

    this.dataSource.paginator = this.paginator;
  }  

  showBasic(): void{
    this.whatToShow = 'ShowBasic';      
  }
  showDevices(): void{
    this.whatToShow = 'ShowDevices';  
  }
  showResolution(): void{
    this.whatToShow = 'ShowResolution';
  }
  showCalls(): void{
    this.whatToShow = 'ShowCalls';    
    this.AllCalls();    
    this.applySearchCall('');
  }

  goDoAddCall(): void{
    this.whatToShow = 'ShowCallsNew';
  }
  
  applySearchCall(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSourceCall.filter = filterValue;
  }

  selectedRazlog: string;
  applyFilterRazlgCall() {
    this.selectedRazlog = this.selectedRazlog.trim(); // Remove whitespace
    this.selectedRazlog = this.selectedRazlog.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSourceCall.filter = this.selectedRazlog;
  }
  
  Add(): void{                
    this.addNew().subscribe(
      (res: any) => {
        console.log(res);
        alert('Uspesno dodate osnovne informacije incidenta');
      },
      err => {
        console.log("Err: " + err);
        alert('Ne mogu da dodam osnovne informacije incidenta.');
      }
    )    
  }

  addNew() {                
    return this.http.put('https://localhost:44301/Incident/addOsnovniInfo/' + this.IncidentID + '/' + 
                                                              this.AffCustomers + '/' + 
                                                              this.Voltage + '/' + 
                                                              this.IncidentPriority + '/' +
                                                              this.CreatedOn + '/' +
                                                              this.ETA.toDateString() + '/' +
                                                              this.ETR.toDateString() + '/' +
                                                              this.ATA.toDateString() + '/' +
                                                              this.Sheduled.toDateString() + '/' +
                                                              this.Type + '/' +
                                                              this.Status + '/' +
                                                              this.Calls + '/' +
                                                              String(this.Confirmed) + '/' +
                                                              String(this.ToMe)
    
    ,null);        
  }  

  AddCall(): void{
    this.addNewCall().subscribe(
      (res: any) => {                
        alert('Uspesno dodavanje poziva.');
      },
      err => {
        console.log("Err: " + err);
        alert('Ne mogu da dodam poziv.');
      }
    )
  }

  addNewCall() {    
    return this.http.put('https://localhost:44301/Pozivi1/add/' + this.Razlog + '/' + this.UzrokPoziva + '/' + this.Komentar + '/' + this.UserID, null);
  }

  AllCalls() {
    POZIVI.splice(0, POZIVI.length);
    this.getCalls().subscribe(
      (res: any) => {
        console.log(res);
        res.forEach(not => POZIVI.push({ id: not.id, 
                                        razlog: not.razlog, 
                                        uzrok: not.uzrok, 
                                        komentar: not.komentar, 
                                        idPotrosaca: not.idPotrosaca}));
        this.dataSourceCall = new MatTableDataSource<PozivTabela>(POZIVI);
        this.dataSourceCall.paginator = this.paginatorCall;
        this.dataSourceCall.sort = this.sortCall;
      },
      err => {
        console.log("Err: " + err);
        alert(err);
      }
    )
  }

  getCalls() {
    return this.http.get('https://localhost:44301/Pozivi1/getall');
  }

  ConfirmedChange(): void{    
    this.Confirmed = !this.Confirmed;
  }

  ToMeChange(): void{
    this.ToMe = !this.ToMe;
  }
  
  ChoseUserDialog(): void {
    const dialogRef = this.dialog.open(ChoseUserDialog, {data: { UserTabela: this.dataSourceUser}});

    dialogRef.afterClosed().subscribe(result => {       
      this.pouniPodatkeUsera(result);       
    });    
  }

  pouniPodatkeUsera(ChosenUsedId: string): void{
    for(var i = 0; i < KORISNICI.length; i++)
    { 
      if(KORISNICI[i].id == ChosenUsedId)
      {
        this.UserID = KORISNICI[i].id;
        this.UserIme = KORISNICI[i].ime;
        this.UserPrezime = KORISNICI[i].prezime;
        this.UserAdresa = KORISNICI[i].adresa;
        this.UserPrioritet = KORISNICI[i].prioritet;

        i = KORISNICI.length;
      }
    }
  }

  AdresaINCIDENTA: string = "";
  choseDeviceDialog(): void{
    if(this.AdresaINCIDENTA == ""){
      
    }else{

    }
    const dialogRef = this.dialog.open(ChoseDeviceDialog, {data: { UserTabela: this.dataSourceOpremaSva}});

    dialogRef.afterClosed().subscribe(result => {       
      this.pouniPodatkeUsera(result);       
    });  
  }

}
////////////////////////////////////////////////////////////////////////OPREMA DIALOG/////////////////////////////////////////////////////////////////////////////////////////////////////
export interface OpremaData {  
  OpremaTabela: MatTableDataSource<OpremaTabela>;
  opremaId: string;
}

@Component({
  selector: 'chose-device-dialog',
  templateUrl: 'chose-device-dialog.html',
  styleUrls: ['./new-incident.component.css']
})
export class ChoseDeviceDialog{    
  dataSourceOprema = new MatTableDataSource<OpremaTabela>();       
  displayedColumnsOpreme: string[] = ['id', 'name', 'type', 'adresa'];

  constructor(public dialogRef: MatDialogRef<ChoseDeviceDialog>, @Inject(MAT_DIALOG_DATA) public data: OpremaData) 
  {
    this.dataSourceOprema = data.OpremaTabela;    
  }

  ngOnInit(): void {       

  }

  @ViewChild(MatPaginator) paginatorOprema: MatPaginator;  
  @ViewChild(MatSort) sortOprema: MatSort;  
  ngAfterViewInit() {
    this.dataSourceOprema.paginator = this.paginatorOprema;
    this.dataSourceOprema.sort = this.sortOprema;    
  }    

  onNoClick(): void {
    this.dialogRef.close();
  }  
  
  applySearchUser(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSourceOprema.filter = filterValue;
  }
}
////////////////////////////////////////////////////////////////////////CHOSE USER DATA DIALOG/////////////////////////////////////////////////////////////////////////////////////////////////////
export interface UserData {
  //UserKolona: Array<string>;
  UserTabela: MatTableDataSource<UserTabela>;
  userId: string;
}

@Component({
  selector: 'chose-user-dialog',
  templateUrl: 'chose-user-dialog.html',
  styleUrls: ['./new-incident.component.css']
})
export class ChoseUserDialog implements OnInit, AfterViewInit{    
  dataSourceUser = new MatTableDataSource<UserTabela>();     
  displayedColumnsUser: string[] = ['id', 'ime', 'prezime', 'adresa', 'prioritet'];

  constructor(public dialogRef: MatDialogRef<ChoseUserDialog>, @Inject(MAT_DIALOG_DATA) public data: UserData) 
  {
    this.dataSourceUser = data.UserTabela;    
  }

  ngOnInit(): void {       

  }

  @ViewChild(MatPaginator) paginatorUser: MatPaginator;  
  @ViewChild(MatSort) sortUser: MatSort;  
  ngAfterViewInit() {
    this.dataSourceUser.paginator = this.paginatorUser;
    this.dataSourceUser.sort = this.sortUser;    
  }    

  onNoClick(): void {
    this.dialogRef.close();
  }  
  
  applySearchUser(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSourceUser.filter = filterValue;
  }
}
////////////////////////////////////////////////////////////////////////MODELS/////////////////////////////////////////////////////////////////////////////////////////////////////
export interface PozivTabela {
  id: string;
  razlog: string;
  uzrok: string;      
  komentar: string;
  idPotrosaca: string;
}

export const POZIVI: PozivTabela[] = []

export interface UserTabela {
  id: string;
  ime: string;
  prezime: string;      
  adresa: string;
  prioritet: string;
}

export const KORISNICI: UserTabela[] = [    
  { id: '1', ime: 'ime1', prezime: 'prezime1', adresa: 'adresa1', prioritet: 'prioritet1'},
  { id: '2', ime: 'ime2', prezime: 'prezime2', adresa: 'adresa2', prioritet: 'prioritet2'},
  { id: '3', ime: 'ime3', prezime: 'prezime3', adresa: 'adresa3', prioritet: 'prioritet3'},
  { id: '4', ime: 'ime4', prezime: 'prezime4', adresa: 'adresa4 dsff, fwef e2 fe s', prioritet: 'prioritet4'},
  { id: '5', ime: 'ime5', prezime: 'prezime5', adresa: 'adresa5', prioritet: 'prioritet5'},
  { id: '6', ime: 'ime6', prezime: 'prezime6', adresa: 'adresa6', prioritet: 'prioritet6'},
  { id: '7', ime: 'ime7', prezime: 'prezime7', adresa: 'adresa7', prioritet: 'prioritet7'},  
  { id: '84412', ime: 'ime84412', prezime: 'prezime84412', adresa: 'adresa84412', prioritet: 'prioritet84412'},  
]

export interface OpremaTabela {
  id: number;
  name: string;
  type: string;    
  adresa: string;  
}

export const OPREMA_izabrana: OpremaTabela[] = []
export const OPREMA_sva: OpremaTabela[] = [] 