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
  selector: 'elementi-mreze',
  templateUrl: './elementi-mreze.component.html',
  styleUrls: ['./elementi-mreze.component.css']
})
export class ElementiMrezeComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'type', 'adresa'];
  listaAdresa = new Array<string>();
  
  filtriraniElementi = new MatTableDataSource<Oprema>(); 

  whatToShow: string = 'ShowAllOpremu';

  addID: string = "";
  addAdresa: string = "";
  addType: string = "";
  addName: string = "";  

  constructor(private http: HttpClient, private backendService: BackendServiceService, private router: Router) {    
    //if (this.userLoggedIn) 
    this.AllOprema();

    this.listaAdresa.push("");
    this.getAdrese();
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

  ngOnInit(){
     
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;    
  @ViewChild(MatSort) sort: MatSort;    
  ngAfterViewInit() {        
    this.filtriraniElementi.paginator = this.paginator;
    this.filtriraniElementi.sort = this.sort;    
  }  

  applySearch(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.filtriraniElementi.filter = filterValue;
  }

  selectedType: string = "";
  selectedAdresa: string = "";
  applyFilter() {    
    OPREMA_Filtrirana.splice(0, OPREMA_Filtrirana.length);
    for(var i=0; i<OPREMA.length; i++){
      if(this.selectedType != "" && this.selectedAdresa != ""){      
        if(OPREMA[i].type == this.selectedType && OPREMA[i].adresa == this.selectedAdresa){
          OPREMA_Filtrirana.push(OPREMA[i]);
        }
      }else if (this.selectedType != "") {
        if(OPREMA[i].type == this.selectedType){
          OPREMA_Filtrirana.push(OPREMA[i]);
        }
      } else if(this.selectedAdresa != ""){
        if(OPREMA[i].adresa == this.selectedAdresa){
          OPREMA_Filtrirana.push(OPREMA[i]);
        }
      }else{
        OPREMA_Filtrirana.push(OPREMA[i]);
      }

    }    

    this.filtriraniElementi = new MatTableDataSource<Oprema>(OPREMA_Filtrirana);           
    this.ngAfterViewInit(); 
  }  

  Cancel(): void{
    this.whatToShow = 'ShowAllOpremu';
    this.addID = "";
    this.addType = "";
    this.addAdresa = "";
    this.addName = "";
  }

  okAdresa: boolean = false;
  okType: boolean = false;
  fieldValidation(): boolean {  
    var ok = true;
    if(this.addAdresa == ""){
      ok = false;
      this.okAdresa = true;
    }
    else{
      this.okAdresa = false;
    }
    if(this.addType == ""){      
      ok = false;
      this.okType = true;
    }
    else{
      this.okType = false;
    }

     return ok;
   }

  goDoAdd(): void{
    this.whatToShow = 'ShowAddOpremu';            
        this.getNewOpremaId().subscribe(
          (res: any) => {          
            this.addID = res;             
          },
          err => {
            console.log("Err: " + err);
            alert(err);
          }
        )   
  }

  getNewOpremaId(){
    return this.http.get('https://localhost:44301/Oprema/getnewid');
  }

  addTypee(): void{
    this.addName = "";
    if(this.addType != ""){
      this.getNewOpremaName().subscribe(
        (res: any) => {                  
          this.addName = res;  
          this.addName = this.addType[0].toUpperCase() + this.addType[1].toUpperCase() + this.addType[2].toUpperCase() + this.addName;            
        },
        err => {
          console.log("Err: " + err);
          alert(err);
        }
      ) 
    } 
  }

  getNewOpremaName(){    
    return this.http.get('https://localhost:44301/Oprema/getnewname/' + this.addType);    
  }

  Add(): void{    
    if(this.fieldValidation()){
      this.putNewOpremu().subscribe(
        (res: any) => {  
          this.AllOprema();                      
          this.Cancel();
        },
        err => {
          console.log("Err: " + err);
          alert('Ne mogu da dodam opremu.');
        }
      )   
    }
  }

  putNewOpremu(){    
    return this.http.put('https://localhost:44301/Oprema/add/' + this.addID + '/' + this.addName + '/' + this.addType + '/' + this.addAdresa, null);    
  }

  AllOprema() {
    OPREMA.splice(0, OPREMA.length);
    this.getOpremu().subscribe(
      (res: any) => {
        console.log(res);
        res.forEach(not => OPREMA.push({ id: not.id, 
                                        name: not.name, 
                                        type: not.type, 
                                        adresa: not.adresa}));
        this.applyFilter();
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

  workWithId: string;
  workWithAdresa: string;
  workWithType: string;
  workWithName: string;
  workWith(opremaId: string): void{
    this.whatToShow = 'ShowWorkWith';
    this.getOpremuId(opremaId);    
  }

  getOpremuId(id: string){
    this.getOpremuById(id).subscribe(
      (res: any) => {        
        this.workWithId = res[0].id;
        this.workWithAdresa = res[0].adresa;
        this.workWithType = res[0].type;
        this.workWithName = res[0].name;          
      },
      err => {
        console.log("Err: " + err);
        alert(err);
      }
    )
  }
  
  getOpremuById(id: string) {    
    return this.http.get('https://localhost:44301/Oprema/getbyid/' + id);
  }

  Edit(): void{    
    if(this.fieldWorkValidation()){
      this.etitOpremu().subscribe(
        (res: any) => { this.AllOprema(); },
        err => {
          console.log("Err: " + err);
          alert('Ne mogu da editujem opremu.');
        }
      )           
      this.whatToShow = 'ShowAllOpremu';      
    }           
  }

  etitOpremu(){    
    return this.http.put('https://localhost:44301/Oprema/edit/' + this.workWithId + '/' + this.workWithAdresa, null);    
  }
        
  okWorkAdresa: boolean = false;
  fieldWorkValidation(): boolean {  
    var ok = true;
    if(this.workWithAdresa == ""){
      ok = false;
      this.okWorkAdresa = true;
    }
    else{
      this.okWorkAdresa = false;
    }
     return ok;
   }

   Delete(): void{
    this.deleteOpremu().subscribe(
      (res: any) => { this.AllOprema(); },
      err => {
        console.log("Err: " + err);
        alert('Ne mogu da editujem opremu.');
      }
    )           
    this.whatToShow = 'ShowAllOpremu';  
   }
   deleteOpremu(){    
    return this.http.put('https://localhost:44301/Oprema/delete/' + this.workWithId, null);    
  }

   CancelWork(): void{
    this.whatToShow = 'ShowAllOpremu';
   }

}










export interface Oprema {
  id: number;
  name: string;
  type: string;    
  adresa: string;  
}

export const OPREMA: Oprema[] = [  
  /*
  { id: 1, name: 'PRE1', type: 'prekidac', adresa: 'adresa1'},  
  { id: 2, name: 'PRE2', type: 'prekidac', adresa: 'adresa2'},  
  { id: 3, name: 'PRE3', type: 'prekidac', adresa: 'adresa3'},  
  { id: 4, name: 'OSI1', type: 'osigurac', adresa: 'adresa4'},  
  { id: 5, name: 'OSI2', type: 'osigurac', adresa: 'adresa1'},  
  { id: 6, name: 'OSI3', type: 'osigurac', adresa: 'adresa2'},  
  { id: 7, name: 'TRA1', type: 'transformator', adresa: 'adresa3'},  
  { id: 8, name: 'TRA2', type: 'transformator', adresa: 'adresa4'},  
  { id: 9, name: 'DIS1', type: 'diskonektor', adresa: 'adresa5'},  
  */
]

export const OPREMA_Filtrirana: Oprema[] = [] 

export interface Adresa {
  ulica: string;
  prioritet: string;        
}

export const ADRESE: Adresa[] = []  