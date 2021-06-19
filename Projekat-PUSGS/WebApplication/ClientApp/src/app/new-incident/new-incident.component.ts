import { AfterViewInit, Component, ViewChild, OnInit, Inject} from '@angular/core';
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
  AffCustomers: string = "";
  Voltage: string = "";  
  IncidentPriority: string;
  CreatedOn: string;   
  ETA: Date;
  ETR: Date;
  ATA: Date;
  Sheduled: Date;
  Type: string = "";
  Status: string = 'DRAFT';
  Calls: string = 'temp';
  Confirmed: boolean = false;
  ToMe: boolean = false;

  Uzrok: string = "";
  Poduzrok: string = "";
  Konstrukcija: string = "";
  Materijal: string = "";

  prozorNewCall: boolean = false;
  
  Razlog: string = "";
  UzrokPoziva: string = "";      
  Komentar: string = "";

  UserID: string = "anon";
  UserIme: string;
  UserPrezime: string;
  UserAdresa: string;
  UserPrioritet: string;

  listaAdresa = new Array<string>();

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

    this.CreatedOn = new Date().toDateString();    

    this.userLoggedIn = this.isLoggedIn();   
    //this.IncidentID = 'tempId';
    this.IncidentPriority = 'temp';

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
    
    
    this.listaAdresa.push("");
    this.getAdrese();    
        ////////////////////////////////////////////////////////////////////////////////////////////////////
    this.AllOprema()
  }
  
  getAdrese() {    
    this.getAdresee().subscribe(
      (res: any) => {
        console.log(res);
        res.forEach(not => ADRESE.push({ ulica: not.ulica, prioritet: not.prioritet}));
        res.forEach(not => this.listaAdresa.push(not.ulica));
        this.ngOnInit();
        this.ngAfterViewInit();
      },
      err => {
        console.log("Err: " + err);
        alert(err);
      }
    )
  }

  getAdresee() {
    return this.http.get('https://localhost:44301/Adresa/getall');
  }

  getNewIncidentId(){
    return this.http.get('https://localhost:44301/Incident/getnewid');
  }

  changeUzrok(): void{    
    this.Poduzrok = "";
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
    if(!this.confirmedOsnovniInfo){
      this.whatToShow = 'ShowBasic'; 
    }else{
      this.whatToShow = 'ShowConfirmedBasic'; 
    }
  }
  showDevices(): void{
    this.whatToShow = 'ShowDevices';  
  }
  showResolution(): void{
    if(!this.confirmedResulution){
      this.whatToShow = 'ShowResolution';
    }else{
      this.whatToShow = 'ShowConfirmedResolution';
    }    
  }
  showCalls(): void{
    this.whatToShow = 'ShowCalls';    
    this.AllCalls();    
    //this.CallsByAdresa();
    this.applySearchCall('');
  }
  CancelCall(): void{
    this.whatToShow = 'ShowCalls';
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
        //alert('Uspesno dodate osnovne informacije incidenta');
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

  AddResolution(): void{                
    this.addNewResolution().subscribe(
      (res: any) => {                
      },
      err => {
        console.log("Err: " + err);
        alert('Ne mogu da dodam resolution.');
      }
    )    
  }

  addNewResolution() {    
    return this.http.put('https://localhost:44301/Resolution/add/' + this.IncidentID + '/' + this.Uzrok + '/' + this.Poduzrok + '/' + this.Konstrukcija + '/' + this.Materijal, null);
  }

  confirmedCall: boolean = false;
  AddCall(): void{
    if(this.fieldValidationCall()){
      this.addNewCall().subscribe(
        (res: any) => {                
          alert('Uspesno dodavanje poziva.');
          this.confirmedCall = true;
          this.showCalls();
        },
        err => {
          console.log("Err: " + err);
          alert('Ne mogu da dodam poziv.');
        }
      )
    }
  }

  addNewCall() {    
    return this.http.put('https://localhost:44301/Pozivi1/add/' + this.Razlog + '/' + this.UzrokPoziva + '/' + this.Komentar + '/' + this.UserID + '/' + this.AdresaINCIDENTA, null);
  }

  AllCalls() {
    POZIVI.splice(0, POZIVI.length);
    if(this.AdresaINCIDENTA != "")
    {
      //this.getCalls().subscribe( ////////////////////////////////////////////////////////////////////////////////////umesto svih, samo one koji su u vezi sa adresom opreme
      this.getCallsByAdresa().subscribe(
        (res: any) => {
          console.log(res);
          res.forEach(not => POZIVI.push({ id: not.id, 
                                          razlog: not.razlog, 
                                          uzrok: not.uzrok, 
                                          komentar: not.komentar, 
                                          idPotrosaca: not.idPotrosaca,
                                          adresaIncidenta: not.idPotrosaca}));
          this.dataSourceCall = new MatTableDataSource<PozivTabela>(POZIVI);
          this.dataSourceCall.paginator = this.paginatorCall;
          this.dataSourceCall.sort = this.sortCall;          
          this.Calls = POZIVI.length.toString();
          if(POZIVI.length == 0){
            this.finishCall = false;
          }else{
            this.finishCall = true;
          }
        },
        err => {
          console.log("Err: " + err);
          alert(err);
        }
      )
    }           
  }

  getCalls() {
    return this.http.get('https://localhost:44301/Pozivi1/getall');
  }

  getCallsByAdresa() {
    return this.http.get('https://localhost:44301/Pozivi1/getbyadresa/' + this.AdresaINCIDENTA);
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
      this.AllOprema();        
    }else{
      this.OpremaSaAdresom();
    }    
  
    this.dataSourceOpremaSva = new MatTableDataSource<OpremaTabela>(OPREMA_sva);        

    const dialogRef = this.dialog.open(ChoseDeviceDialog, {data: { OpremaTabela: this.dataSourceOpremaSva,
                                                                  ListaAdresa: this.listaAdresa,
                                                                  IzabranaAdresa: this.AdresaINCIDENTA}});

    dialogRef.afterClosed().subscribe(result => {       
      this.OpremaJeIzabrana(result);       
    });  
  }

  OpremaJeIzabrana(IzabranaOpremaId: string): void{
    for(var i = 0; i < OPREMA_sva.length; i++)
    { 
      if(OPREMA_sva[i].id == IzabranaOpremaId)
      {
        OPREMA_izabrana.push(OPREMA_sva[i])
        this.AdresaINCIDENTA = OPREMA_sva[i].adresa;
        i = OPREMA_sva.length;
        this.podesiParametreNaOsnovuAdrese();
      }
    }

    this.dataSourceOprema = new MatTableDataSource<OpremaTabela>(OPREMA_izabrana);    
  }

  obrisiOpremu(opremaId: string): void{
    if(!this.confirmedOprema){
      for(var i=0; i < OPREMA_izabrana.length; i++){
        if(OPREMA_izabrana[i].id == opremaId){
          OPREMA_izabrana.splice(i, 1);
          i = OPREMA_izabrana.length;        
        }    
      }
      this.dataSourceOprema = new MatTableDataSource<OpremaTabela>(OPREMA_izabrana); 
      
      if(OPREMA_izabrana.length == 0){
        this.AdresaINCIDENTA = "";
        this.finishCall = false;
        this.podesiParametreNaOsnovuAdrese()
      }
    }
  }

  podesiParametreNaOsnovuAdrese():void{
    if(this.AdresaINCIDENTA == ""){
      this.Calls = 'temp';
      this.IncidentPriority = 'temp';
    }else{
      this.AllCalls();
      for(var i = 0; i<ADRESE.length; i++){
        if(ADRESE[i].ulica == this.AdresaINCIDENTA){
          this.IncidentPriority = ADRESE[i].prioritet;
          i = ADRESE.length;
        }
      }
    }
  }

  AllOprema() {
    OPREMA_sva.splice(0, OPREMA_sva.length);
    this.getOpremu().subscribe(
      (res: any) => {        
        console.log(res);
        res.forEach(not => OPREMA_sva.push({ id: not.id, 
                                        name: not.name, 
                                        type: not.type, 
                                        adresa: not.adresa}));                                              
      },
      err => {
        console.log("Err: " + err);
        alert(err);
      }
    )
  }

  getOpremu() {
    return this.http.get('https://localhost:44301/Oprema/getall');
  }

  OpremaSaAdresom() {
    OPREMA_sva.splice(0, OPREMA_sva.length);
    this.getOpremuSaAdresom().subscribe(
      (res: any) => {        
        console.log(res);
        res.forEach(not => OPREMA_sva.push({ id: not.id, 
                                        name: not.name, 
                                        type: not.type, 
                                        adresa: not.adresa}));                                              
      },
      err => {
        console.log("Err: " + err);
        alert(err);
      }
    )
  }

  getOpremuSaAdresom() {
    return this.http.get('https://localhost:44301/Oprema/getbyadresa/' + this.AdresaINCIDENTA);
  }

  okCallRazlog: boolean = false;
  okCallUzrok: boolean = false; 
  okCallKomentar: boolean = false;   
  fieldValidationCall(): boolean {  
    var ok = true;
    if(this.Razlog == ""){
      ok = false;
      this.okCallRazlog = true;
    }
    else{
      this.okCallRazlog = false;
    }
    if(this.UzrokPoziva == ""){      
      ok = false;
      this.okCallUzrok = true;
    }
    else{
      this.okCallUzrok = false;
    }
    if(this.Komentar == ""){      
      ok = false;
      this.okCallKomentar = true;
    }
    else{
      this.okCallKomentar = false;
    }
    if(!this.confirmedOprema){
      ok = false;
    }

     return ok;
   }
   
   confirmedOprema: boolean = false;  
   ConfirmDevices(): void{
    if(OPREMA_izabrana.length == 0){
      this.confirmedOprema = false;
    }else{
      this.confirmedOprema = true;
    }
   }
   
   okResolutionUzrok: boolean = false;   
   okResolutionPoduzrok: boolean = false;
   okResolutionKonstrukcija: boolean = false;
   okResolutionMaterijal: boolean = false;
   confirmedResulution: boolean = false;
   ConfirmResolution(): void{    
    var ok = true; 

    if(this.Uzrok == ""){
      ok = false;      
      this.okResolutionUzrok = true;
    }else{
      this.okResolutionUzrok = false;
    }
    if(this.Poduzrok == ""){
      ok = false;      
      this.okResolutionPoduzrok = true;
    }else{
      this.okResolutionPoduzrok = false;
    }
    if(this.Konstrukcija == ""){
      ok = false;      
      this.okResolutionKonstrukcija = true;
    }else{
      this.okResolutionKonstrukcija = false;
    }
    if(this.Materijal == ""){
      ok = false;      
      this.okResolutionMaterijal = true;
    }else{
      this.okResolutionMaterijal = false;
    }

    this.confirmedResulution = ok;
    if(this.confirmedResulution){
      this.whatToShow = 'ShowConfirmedResolution';
    }    
   }

   okInfoSheduledTime: boolean = false;
   okInfoETA: boolean = false;
   okInfoATA: boolean = false;
   okInfoETR: boolean = false;
   okInfoAC: boolean = false;
   okInfoVoltage: boolean = false;
   okInfoType: boolean = false;
   fieldValidationOsnovniInfo(): void{
    var ok = true; 

    if(this.Sheduled == undefined){
      ok = false;
      this.okInfoSheduledTime = true;
    }else{
      this.okInfoSheduledTime = false;
    }
    if(this.ETA == undefined){
      ok = false;
      this.okInfoETA = true;
    }else{
      this.okInfoETA = false;
    }
    if(this.ATA == undefined){
      ok = false;
      this.okInfoATA = true;
    }else{
      this.okInfoATA = false;
    }
    if(this.ETR == undefined){
      ok = false;
      this.okInfoETR = true;
    }else{
      this.okInfoETR = false;
    }
    if(this.AffCustomers == ""){
      ok = false;
      this.okInfoAC = true;
    }else{
      this.okInfoAC = false;
    }
    if(this.Voltage == ""){
      ok = false;
      this.okInfoVoltage = true;
    }else{
      this.okInfoVoltage = false;
    }
    if(this.Type == ""){
      ok = false;
      this.okInfoType = true;
    }else{
      this.okInfoType = false;
    }
    this.confirmedOsnovniInfo = ok;    
   }
   
   NoNumberAffCust: boolean = false;
   NoNumberVoltage: boolean = false;
   confirmedOsnovniInfo: boolean = false;
   ConfirmOsnovniInfo(): void{
    this.fieldValidationOsnovniInfo();

    if(this.confirmedOsnovniInfo){
      var ok = true;      
      if(isNaN(Number(this.AffCustomers))){
        ok = false;
        this.NoNumberAffCust = true;      
      }else{
        this.NoNumberAffCust = false;
      }
      if(isNaN(Number(this.Voltage))){
        ok = false;
        this.NoNumberVoltage = true;      
      }else{
        this.NoNumberVoltage = false;
      }
      
      this.confirmedOsnovniInfo = ok;
      if(this.confirmedOsnovniInfo){
        this.whatToShow = 'ShowConfirmedBasic'
      
        this.strSheduled = this.Sheduled.toDateString();
        this.strETA = this.ETA.toDateString();
        this.strATA = this.ATA.toDateString();          
        this.strETR = this.ETR.toDateString();
      }
    }   
  }
  strSheduled: string;
  strETA: string;
  strATA: string;
  strETR: string;
  
  finishCall: boolean = false;
  finish(): void{    
    if(this.confirmedOsnovniInfo && this.confirmedOprema && this.confirmedResulution && this.finishCall){
      console.log('BRAVO');
      this.clear();
    }
  }

  clear(): void{

  }
}
////////////////////////////////////////////////////////////////////////OPREMA DIALOG/////////////////////////////////////////////////////////////////////////////////////////////////////
export interface OpremaData {  
  OpremaTabela: MatTableDataSource<OpremaTabela>;  
  ListaAdresa: string[];
  IzabranaAdresa: string;
  opremaId: string;
}

@Component({
  selector: 'chose-device-dialog',
  templateUrl: 'chose-device-dialog.html',
  styleUrls: ['./new-incident.component.css']
})
export class ChoseDeviceDialog implements AfterViewInit{    
  dataSourceOprema = new MatTableDataSource<OpremaTabela>();       
  displayedColumnsOpreme: string[] = ['id', 'name', 'type', 'adresa'];
  listaAdresa: string[];
  adresa: string

  constructor(public dialogRef: MatDialogRef<ChoseDeviceDialog>, @Inject(MAT_DIALOG_DATA) public data: OpremaData) 
  {
    this.listaAdresa = data.ListaAdresa;    
    this.adresa = data.IzabranaAdresa;
    this.applyFilter();
  }

  ngOnInit(): void {       
    //this.dataSourceOprema = new MatTableDataSource<OpremaTabela>(OPREMA_sva);       
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
  
  applySearch(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSourceOprema.filter = filterValue;    
  }
  
  selectedType: string = "";
  selectedAdresa: string = "";
  applyFilter() {    
    OPREMA_Filtrirana.splice(0, OPREMA_Filtrirana.length);
    for(var i=0; i<OPREMA_sva.length; i++){      
        if(this.selectedType != "" && this.selectedAdresa != ""){      
          if(OPREMA_sva[i].type == this.selectedType && OPREMA_sva[i].adresa == this.selectedAdresa){
            OPREMA_Filtrirana.push(OPREMA_sva[i]);
          }
        }else if (this.selectedType != "") {
          if(OPREMA_sva[i].type == this.selectedType){
            OPREMA_Filtrirana.push(OPREMA_sva[i]);
          }
        } else if(this.selectedAdresa != ""){
          if(OPREMA_sva[i].adresa == this.selectedAdresa){
            OPREMA_Filtrirana.push(OPREMA_sva[i]);
          }
        }else{
          OPREMA_Filtrirana.push(OPREMA_sva[i]);
        }
      }        

    this.IzbaciVecIzabrane();        
    this.dataSourceOprema = new MatTableDataSource<OpremaTabela>(OPREMA_Filtrirana);           
    this.ngAfterViewInit();     
  }    

  IzbaciVecIzabrane(): void{
    for(var i=0; i < OPREMA_izabrana.length; i++){
      for(var j = OPREMA_Filtrirana.length -1; j >= 0; j--){
        if(OPREMA_Filtrirana[j].id == OPREMA_izabrana[i].id){
          OPREMA_Filtrirana.splice(j, 1);
        }        
      }
    }
  }
}
////////////////////////////////////////////////////////////////////////CHOSE USER DATA DIALOG/////////////////////////////////////////////////////////////////////////////////////////////////////
export interface UserData {  
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

  ngOnInit(): void {}

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
  adresaIncidenta: string;
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
  id: string;
  name: string;
  type: string;    
  adresa: string;  
}

export const OPREMA_izabrana: OpremaTabela[] = []
export const OPREMA_sva: OpremaTabela[] = [] 
export const OPREMA_Filtrirana: OpremaTabela[] = [] 

export interface Adresa {
  ulica: string;
  prioritet: string;        
}

export const ADRESE: Adresa[] = []  