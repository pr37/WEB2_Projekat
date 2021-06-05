import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { AfterViewInit, Component, ViewChild, OnInit, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient, HttpHeaders, HttpClientJsonpModule } from '@angular/common/http';
import { Notification, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { BackendServiceService } from '../backend-service.service';
import { FormGroup,  FormControlName } from '@angular/forms';

@Component({
  selector: 'potrosaci',
  templateUrl: './potrosaci.component.html',
  styleUrls: ['./potrosaci.component.css'],
  providers: [BackendServiceService]
})

export class PotrosaciComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['ID', 'Ime', 'Prezime', 'Adresa', 'Prioritet', 'PhoneNo', 'Tip', 'Edit', 'Delete'];
  dataSource = new MatTableDataSource<PotrosaciTabela>(ELEMENT_DATA);
  userLoggedIn: boolean;
  ngOnInit() {
    this.dataSource = new MatTableDataSource<PotrosaciTabela>(ELEMENT_DATA);
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(public dialog: MatDialog, private http: HttpClient,
    private backendService: BackendServiceService) {
    this.getPotrosaci().subscribe(
      (res: any) => {
        console.log(res);
        res.forEach(not => ELEMENT_DATA.push({ ID: not.potrosacID, Ime: not.ime, Prezime: not.prezime, Adresa: not.adresa, PhoneNo: not.phoneNo, Tip: not.tipPotrosaca, Prioritet: '0' }));
        this.ngOnInit();
      },
      err => {
        console.log("Err: " + err);
        alert(err);
      }
    )
    this.userLoggedIn = this.isLoggedIn();
  }
  isLoggedIn() {
    if (localStorage.getItem('currentUser')) {
      console.log('user is logged in');
      return true;
    }
    console.log('user is not logged in');
    return false;
  }
  potrosacForm = new FormGroup({
    ime: new FormControl('', [Validators.required]),
    prezime: new FormControl(),
    adresa: new FormControl(),
    phoneNo: new FormControl(),
    tipPotrosaca: new FormControl()
  });

  getPotrosaci() {
    return this.http.get('https://localhost:44301/Potrosaci/get');
  }

  editPotrosac(id,ime, prezime, asresa, phoneno, tip) {
    return this.http.put('https://localhost:44301/Potrosaci/edit/' + id +'/' + ime + '/' + prezime + '/' + asresa + '/' + phoneno + '/' + tip, null);
  }

  deletePotrosac(id: string) {
    return this.http.put('https://localhost:44301/Potrosaci/delete/' + id ,id);
  }

  addPotrosac(ime,prezime,asresa,phoneno,tip) {
    let headers = new Headers({ "X-Requested-With": "XMLHttpRequest", "Content-Type": 'application/json' });
    // return this.http.put('https://localhost:44301/Potrosaci/add', potrosac);
    return this.http.put('https://localhost:44301/Potrosaci/add/' + ime + '/' + prezime + '/' + asresa + '/' + phoneno + '/' + tip, null);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NewPotrosacDialog, {

      data: {
        tipovi: ['Rezidentalni', 'Komercijalni'],
        ime: '',
        prezime: '',
        adresa: '',
        phoneno: '',
        tip: ''
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log(result);
      //TODO send to server and refresh collection -- get id
      var body = {
        Ime: result[0].ime,
        Prezime: result[0].prezime,
        Adresa: result[0].adresa,
        PhoneNo: result[0].phoneNo,
        TipPotrosaca: result[0].tipPotrosaca
      }
      console.log(body);
      this.addPotrosac(result[0].ime, result[0].prezime, result[0].adresa, result[0].phoneNo, result[0].tipPotrosaca).subscribe(
        (res: any) => {
          console.log(res);
          //this.ngOnInit();
          ELEMENT_DATA.splice(0, ELEMENT_DATA.length);
          this.getPotrosaci().subscribe(
            (res: any) => {
              console.log(res);
              res.forEach(not => ELEMENT_DATA.push({ ID: not.potrosacID, Ime: not.ime, Prezime: not.prezime, Adresa: not.adresa, PhoneNo: not.phoneNo, Tip: not.tipPotrosaca, Prioritet: '0' }));
              this.ngOnInit();
            },
            err => {
              console.log("Err: " + err);
              alert(err);
            }
          )
        },
        err => {
          console.log("Err: " + err);
          alert(err);
        }
      )
      
      //ELEMENT_DATA.push({ ID: 'tbd', Ime: result[0].ime, Prezime: result[0].prezime, Adresa: result[0].adresa, PhoneNo: result[0].phoneno, Tip: result[0].tip, Prioritet: '0' });
      this.ngOnInit();
    });
  }

  edit(ID,ime,prz,adr,phn,tp): void {
    const dialogRef = this.dialog.open(NewPotrosacDialog, {

      data: {
        tipovi: ['Rezidentalni', 'Komercijalni'],
        Ime: ime,
        Prezime: prz,
        Adresa: adr,
        PhoneNo: phn,
        TipPotrosaca: tp
      }
    });

    
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      var body = {
        PotrosacID: ID,
        Ime: result[0].ime,
        Prezime: result[0].prezime,
        Adresa: result[0].adresa,
        PhoneNo: result[0].phoneNo,
        TipPotrosaca: result[0].tipPotrosaca
      }
      this.editPotrosac(ID, result[0].ime, result[0].prezime, result[0].adresa, result[0].phoneNo, result[0].tipPotrosaca).subscribe(
        (res: any) => {
          console.log(res);
          //this.ngOnInit();
          ELEMENT_DATA.splice(0, ELEMENT_DATA.length);
          this.getPotrosaci().subscribe(
            (res: any) => {
              console.log(res);
              res.forEach(not => ELEMENT_DATA.push({ ID: not.potrosacID, Ime: not.ime, Prezime: not.prezime, Adresa: not.adresa, PhoneNo: not.phoneNo, Tip: not.tipPotrosaca, Prioritet: '0' }));
              this.ngOnInit();
            },
            err => {
              console.log("Err: " + err);
              alert(err);
            }
          )
        },
        err => {
          console.log("Err: " + err);
          alert(err);
        }
      )
      
      //TODO send to server and refresh collection -- get id
     // ELEMENT_DATA.push({ ID: 'tbd', Ime: result[0].ime, Prezime: result[0].prezime, Adresa: result[0].adresa, PhoneNo: result[0].phoneno, Tip: result[0].tip, Prioritet: '0' });
      this.ngOnInit();
    });
  }

  delete(ID): void {
    for (var i = 0; i < ELEMENT_DATA.length; i++) {
      if (ELEMENT_DATA[i].ID === ID) {

        ELEMENT_DATA.splice(i, 1);
      }
    }
    this.ngOnInit();
    this.deletePotrosac(ID).subscribe(
      (res: any) => {
        console.log(res);
        this.ngOnInit();
      },
      err => {
        console.log("Err: " + err);
        alert(err);
      }
    )
  }

}

export interface PotrosaciTabela {
  ID: string;
  Ime: string;
  Prezime: string;
  Adresa: string;
  Prioritet: string;
  PhoneNo: string;
  Tip: string;
}

const ELEMENT_DATA: PotrosaciTabela[] = [
 // { ID: '231', Ime: 'ana', Prezime: 'Anic', Adresa: 'addy1', Prioritet: '2', PhoneNo: '123123', Tip: 'Rezidentalni' },
  //{ ID: '331', Ime: 'ana', Prezime: 'Anic', Adresa: 'addy1', Prioritet: '2', PhoneNo: '123123', Tip: 'Komercijalni' },
]


export interface PotrosacDialogData {
  Ime: string;
  Prezime: string;
  Adresa: string;
  PhoneNo: string;
  TipPotrosaca: string;
}

@Component({
  selector: 'new-potrosac-dialog',
  templateUrl: 'new-potrosac-dialog.html',
  styleUrls: ['./potrosaci.component.css']
})
export class NewPotrosacDialog {
  ime: string;
  prezime: string;
  adresa: string;
  phoneno: string;
  tipp: string;
  obj: [{ ime: string, prezime: string, adresa:string, phoneNo:string, tipPotrosaca:string }];
  constructor(
    public dialogRef: MatDialogRef<NewPotrosacDialog>,
    @Inject(MAT_DIALOG_DATA) public data: PotrosacDialogData) {
    this.ime = data.Ime;
    this.prezime = data.Prezime;
    this.adresa = data.Adresa;
    this.phoneno = data.PhoneNo;
    this.tipp = data.TipPotrosaca;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addPotrosac(tipp): void {
    this.obj = [{ ime: this.ime, prezime: this.prezime, adresa: this.adresa, phoneNo: this.phoneno, tipPotrosaca: tipp }];
  
    this.dialogRef.close(this.obj);
  }
}

