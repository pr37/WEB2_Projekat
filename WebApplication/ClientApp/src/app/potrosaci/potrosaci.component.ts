import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { AfterViewInit, Component, ViewChild, OnInit, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'potrosaci',
  templateUrl: './potrosaci.component.html',
  styleUrls: ['./potrosaci.component.css']
})

export class PotrosaciComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['ID', 'Ime', 'Prezime', 'Adresa', 'Prioritet', 'PhoneNo', 'Tip', 'Edit', 'Delete'];
  dataSource = new MatTableDataSource<PotrosaciTabela>(ELEMENT_DATA);

  ngOnInit() {
    this.dataSource = new MatTableDataSource<PotrosaciTabela>(ELEMENT_DATA);
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(public dialog: MatDialog) {

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
      console.log(result);
      //TODO send to server and refresh collection -- get id
      ELEMENT_DATA.push({ ID: 'tbd', Ime: result[0].ime, Prezime: result[0].prezime, Adresa: result[0].adresa, PhoneNo: result[0].phoneno, Tip: result[0].tip, Prioritet: '0' });
      this.ngOnInit();
    });
  }

  edit(ID,ime,prz,adr,phn,tp): void {
    const dialogRef = this.dialog.open(NewPotrosacDialog, {

      data: {
        tipovi: ['Rezidentalni', 'Komercijalni'],
        ime: ime,
        prezime: prz,
        adresa: adr,
        phoneno: phn,
        tip: tp
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      //TODO send to server and refresh collection -- get id
      ELEMENT_DATA.push({ ID: 'tbd', Ime: result[0].ime, Prezime: result[0].prezime, Adresa: result[0].adresa, PhoneNo: result[0].phoneno, Tip: result[0].tip, Prioritet: '0' });
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
  { ID: '231', Ime: 'ana', Prezime: 'Anic', Adresa: 'addy1', Prioritet: '2', PhoneNo: '123123', Tip: 'Rezidentalni' },
  { ID: '331', Ime: 'ana', Prezime: 'Anic', Adresa: 'addy1', Prioritet: '2', PhoneNo: '123123', Tip: 'Komercijalni' },
]


export interface PotrosacDialogData {
  ime: string;
  prezime: string;
  adresa: string;
  phoneno: string;
  tip: string;
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
  obj: [{ ime: string, prezime: string, adresa:string, phoneno:string, tip:string }];
  constructor(
    public dialogRef: MatDialogRef<NewPotrosacDialog>,
    @Inject(MAT_DIALOG_DATA) public data: PotrosacDialogData) {
    this.ime = data.ime;
    this.prezime = data.prezime;
    this.adresa = data.adresa;
    this.phoneno = data.phoneno;
    this.tipp = data.tip;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addPotrosac(tipp): void {
    this.obj = [{ ime: this.ime, prezime: this.prezime, adresa: this.adresa, phoneno: this.phoneno, tip: tipp }];
  
    this.dialogRef.close(this.obj);
  }
}

