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

  displayedColumnsOpreme: string[] = ['id', 'name', 'type', 'adresa'];
  dataSourceOprema = new MatTableDataSource<OpremaTabela>();
  dataSourceOpremaSva = new MatTableDataSource<OpremaTabela>();

  mainWindow: string = 'START';
  whatToShow: string = "ShowBasic";  
  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar, private http: HttpClient, private backendService: BackendServiceService) {
    this.AllOprema()
    this.History = 'Dokument je napravljen: ' + this.CreatedOn;
  }
  History: string;

  ngOnInit() {
    this.dataSourceOprema = new MatTableDataSource<OpremaTabela>(OPREMA_izabrana);
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
    this.whatToShow = 'ShowChecklist';
  }
  showDevices(): void{
    this.whatToShow = 'ShowDevices';
  }
  
  finish(): void{
    this.AddOnsnovniInfo();
  }

  Check1: boolean = false;
  check1(){ this.Check1 != this.Check1 }
  Check2: boolean = false;
  check2(){ this.Check2 != this.Check2 }
  Check3: boolean = false;
  check3(){ this.Check3 != this.Check3 }
  Check4: boolean = false;
  check4(){ this.Check4 != this.Check4 }

  AddOnsnovniInfo(): void{
    //if(this.fieldValidationCall()){
    if(true){
      this.AddOnsnovniInfoo().subscribe(
        (res: any) => {                          
          //this.confirmedCall = true;          
        },
        err => {
          console.log("Err: " + err);
          alert('Ne mogu da dodam poziv.');
        }
      )
    }
  }

  AddOnsnovniInfoo() {    
    return this.http.put('https://localhost:44301/BezbednosniDokumentiInfo/add/' 
    + this.Type + '/' + this.PlanRada + '/' + this.Status + '/' + this.Username + '/' + this.Ekipa + '/'
    + this.Detalji + '/' + this.Beleske + '/' + this.TelBroj + '/' + this.CreatedOn
    , null);
  }
  ///////////////////////////---------------DEVICE___DIALOG----------------/////////////////////////
  AdresaINCIDENTA: string = "";  
  choseDeviceDialog(): void{
    if(this.AdresaINCIDENTA == ""){
      this.AllOprema();        
    }else{
      this.OpremaSaAdresom();
    }    
  
    this.dataSourceOpremaSva = new MatTableDataSource<OpremaTabela>(OPREMA_sva);        

    const dialogRef = this.dialog.open(ChoseDeviceDialogg, {data: { OpremaTabela: this.dataSourceOpremaSva,
                                                                  //ListaAdresa: this.listaAdresa,
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
        console.log('dobro je i jos: ' + this.AdresaINCIDENTA)       
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

  confirmedOprema: boolean = false;  
  DevicesNames: string = "";
  ConfirmDevices(): void{
   if(OPREMA_izabrana.length == 0){
     this.confirmedOprema = false;
   }else{
     this.confirmedOprema = true;
     OPREMA_izabrana.forEach(element => {
       this.DevicesNames += element.name + " ";
     });
   }
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
  selector: 'chose-device-dialogg',
  templateUrl: 'chose-device-dialog.html',  
  styleUrls: ['./bezbednosni-dokumenti.component.css']
})
export class ChoseDeviceDialogg implements AfterViewInit{    
  dataSourceOprema = new MatTableDataSource<OpremaTabela>();       
  displayedColumnsOpreme: string[] = ['id', 'name', 'type', 'adresa'];
  listaAdresa: string[];
  adresa: string

  constructor(public dialogRef: MatDialogRef<ChoseDeviceDialogg>, @Inject(MAT_DIALOG_DATA) public data: OpremaData) 
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

export const BD_osnovni_info: BezbednosniDokumentiOsnovniInfoTabela[] = []

export interface BezbednosniDokumentiOsnovniInfoTabela {  
  type: string; 
  planRada: string; 
  status: string; 
  username: string; 
  ekipa: string; 
  detalji: string; 
  beleske: string;
  telBroj: string; 
  createdOn: string;
}

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