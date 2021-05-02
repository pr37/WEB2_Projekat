import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';



export interface DialogData {
  selectedCrew: string;
}

@Component({
  selector: 'new-plan-rada',
  templateUrl: './new-plan-rada.component.html',
  styleUrls: ['./new-plan-rada.component.css']
})

export class NewPlanRadaComponent implements OnInit{

 // Status: string;
  Status : string;
  IncidentID: 'TestID';
  CreatedBy: string;
  PhoneNo: string;
  Company: string;
  Purpose: string;
  Details: string;
  Notes: string;
  Address: string;
  crewID: string;
  CreatedOn: FormControl;

  constructor(public dialog: MatDialog) {
    this.Status = 'DRAFT';
    this.CreatedOn = new FormControl(new Date());
    //TODO get values

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
     
      data: { options: ['crew1','crew2'] }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.crewID = result;
    });
  }

  control = new FormControl();
  svrhe: string[] = ['Popravka 123', 'Zamena 22', 'Instalacija ...', 'Provera ...'];
  filteredSvrhe: Observable<string[]>;

  ngOnInit() {
    this.filteredSvrhe = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.svrhe.filter(svrha => this._normalizeValue(svrha).indexOf(filterValue) !== -1);
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }
}


@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
  styleUrls: ['./new-plan-rada.component.css']
})
export class DialogOverviewExampleDialog {
  crewID: string;
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmSelection(): void {
    this.dialogRef.close(this.crewID);
  }
}
