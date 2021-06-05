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


export interface DialogData {
  selectedCrew: string;
}

export interface Element {
  UserID: string;
  ChangedDate: string;
}

const ELEMENT_DATA: Element[] = [
  { UserID: 'asd22', ChangedDate : 'test' },
  { UserID: 'asd22', ChangedDate : 'test' },
  { UserID: 'asd22', ChangedDate : 'test' },
  { UserID: 'asd22', ChangedDate : 'test' },
  { UserID: 'asd22', ChangedDate : 'test' },
  { UserID: 'asd22', ChangedDate : 'test' },
  { UserID: 'asd22', ChangedDate : 'test' }
];

@Component({
  selector: 'new-plan-rada',
  templateUrl: './new-plan-rada.component.html',
  styleUrls: ['./new-plan-rada.component.css']
})

export class NewPlanRadaComponent implements OnInit, AfterViewInit{

  displayedColumns: string[] = ['UserID', 'ChangedDate'];
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ShowBasic: boolean;
  ShowHistory: boolean;
  ShowMultimedia: boolean;
  ShowEquipment: boolean;
  ShowInstructions: boolean;

  Status : string;
  IncidentID: 'TestID';
  TypeRada: string;
  TypeNaCemu: string;
  CreatedBy: string;
  PhoneNo: string;
  Company: string;
  Purpose: string;
  Details: string;
  Notes: string;
  Address: string;
  crewID: string;
  CreatedOn: FormControl;
  FromDate: Date;
  ToDate: Date;

  images: string[];
  copyToWorkPlanID: string;
  allWorkPlanIDs: string[];
  url: string;
  public uploading: boolean;

  equipments: string[];
  equipmentState: string;

  instructions: Array<{ id: string, text: string, executed: string, validated: string, equipment: string }>;
  adresaElementa: string;

  userLoggedIn: boolean;
  isLoggedIn() {
    if (localStorage.getItem('currentUser')) {
      console.log('user is logged in');
      return true;
    }
    console.log('user is not logged in');
    return false;
  }

  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar, private http: HttpClient,
    private backendService: BackendServiceService) {
    this.uploading = false;

    this.ShowBasic = true;
    this.ShowHistory = false;
    this.ShowMultimedia = false;
    this.ShowEquipment = false;
    this.ShowInstructions = false;

    this.Status = 'DRAFT';
    this.Address = '';
    this.CreatedOn = new FormControl(new Date());
    //TODO get values
    this.images = ['https://material.angular.io/assets/img/examples/shiba2.jpg'];
    this.allWorkPlanIDs = ['test1', 'test2'];
    this.equipments = ['test1', 'test2'];
    this.equipmentState = 'NOT ADDED';
    this.instructions = new Array();
    this.instructions.push({ id: "1a", text: "set this to that", executed: "UNEXECUTED", equipment: "testEqp", validated: "NOT VALIDATED" });
    this.instructions.push({ id: "2a", text: "set this to that", executed: "EXECUTED", equipment: "testEqp2", validated: "NOT VALIDATED" });

    this.userLoggedIn = this.isLoggedIn();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  showBasic(): void {
    this.ShowBasic = true;
    this.ShowHistory = false;
    this.ShowMultimedia = false;
    this.ShowEquipment = false;
    this.ShowInstructions = false;
  }

  showHistory(): void {
    this.ShowBasic = false;
    this.ShowHistory = true;
    this.ShowMultimedia = false;
    this.ShowEquipment = false;
    this.ShowInstructions = false;
  }

  showMultimedia(): void {
    this.ShowBasic = false;
    this.ShowHistory = false;
    this.ShowMultimedia = true;
    this.ShowEquipment = false;
    this.ShowInstructions = false;
  }

  showEquipment(): void {
    this.ShowBasic = false;
    this.ShowHistory = false;
    this.ShowMultimedia = false;
    this.ShowEquipment = true;
    this.ShowInstructions = false;
  }

  showInstructions(): void {
    this.ShowBasic = false;
    this.ShowHistory = false;
    this.ShowMultimedia = false;
    this.ShowEquipment = false;
    this.ShowInstructions = true;
  }

  addNewWorkPlan(): void {
    //Status: string;
    //IncidentID: 'TestID';
    //TypeRada: string;
    //TypeNaCemu: string;
    //CreatedBy: string;
    //PhoneNo: string;
    //Company: string;
    //Purpose: string;
    //Details: string;
    //Notes: string;
    //Address: string;
    //crewID: string;
    //CreatedOn: FormControl;
    //FromDate: Date;
    //ToDate: Date;
    console.log(this.Status + " " + this.IncidentID + " " + this.TypeRada + " " + this.TypeNaCemu + " " + this.PhoneNo + " " + this.CreatedBy + " " + this.Company + " " + this.Purpose
      + " " + this.Details + " " + this.Notes + " " + this.Address + " "+  this.FromDate + " "+ this.ToDate)
  }

  addNew(createdby:string,status:string,datecreated:string,company:string,tipnacemu:string,startdate:string,enddate:string,adresa:string,svrha:string,beleske:string,) {
    //add/{createdby}/{status}/{datecreated}/{company}/{tipnacemu}/{startdate}/{enddate}/{adresa}/{svrha}/{beleske}/{detalji}/{tiprada}/{phoneno}
    return this.http.get('https://localhost:44301/PlanoviRada/add');
  }

  approveDocument(): void {
    this.Status = 'APPROVED';
  }

  denyDocument(): void {
    this.Status = 'DENIED';
  }

  cancelDocument(): void {
    this.Status = 'CANCELED';
  }

  addEquipment(): void {

  }

  removeEquipment(): void {

  }

  executeInstruction(id): void {
    for (var i = 0; i < this.instructions.length; i++) {

      if (this.instructions[i].id === id && this.instructions[i].validated === "VALIDATED") {

        this.instructions[i].executed = "EXECUTED";
      }
    }

    for (var i = 0; i < this.instructions.length; i++) {

      if (this.instructions[i].executed !== "EXECUTED") {
        return;
      }
    }
    this.Status = 'COMPLETED';

    //TODO update db
  }

  deleteInstruction(id): void {
    for (var i = 0; i < this.instructions.length; i++) {

      if (this.instructions[i].id === id) {

        this.instructions.splice(i,1);
      }
    }
    //TODO update db
  }

  validateInstructions(): void {
    this.adresaElementa = "test" //TODO GET
                                  //TODO nalog za rad-plan rada-adrese
    if (this.Address === this.adresaElementa) {

      for (var i = 0; i < this.instructions.length; i++) {
        this.instructions[i].validated = "VALIDATED";
      }
    }
  }

  deleteAllInstructions(): void {
      this.instructions.splice(0, this.instructions.length);
      //TODO update db
  }

  addNewInstructionDialog(): void {
    const dialogRef = this.dialog.open(InstructionDialog, {

      data: {
        equipments: this.equipments
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.instructions.push({ id: "2a", text: result[0].text, executed: "UNEXECUTED", equipment: result[0].eqp, validated: "NOT VALIDATED" });
      //TODO send to server and refresh collection -- get id
    });
  }
  
  onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      this.uploading = true;
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result as string;
        console.log(this.url);
        this.images.push(this.url);
        this.uploading = false;
        this.ngOnInit();
      }
    }
  }

  handleImage(image): void {
    const dialogRef = this.dialog.open(ImageDialog, {
 
      data: {
        url: image,
        images: this.images,
        options: this.allWorkPlanIDs
      }
    });
    console.log(image);

    dialogRef.afterClosed().subscribe(result => {
      //console.log(result);
      console.log(Array.isArray(result));
      if (Array.isArray(result)) {
        this.images = result;
      } else if (result != undefined || result != null) {
        //copy into work plan
        console.log(result);
        this.copyToWorkPlanID = result;
      }
    });
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

export interface ImageDialogData {
  selectedWorkPlan: string;
}

@Component({
  selector: 'image-dialog',
  templateUrl: 'image-dialog.html',
  styleUrls: ['./new-plan-rada.component.css']
})
export class ImageDialog {
  workPlanID: string;
  newimages: string[];
  constructor(
    public dialogRef: MatDialogRef<ImageDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ImageDialogData) {
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteImage(url,images): void {
    console.log(url);
    //TODO remove from DB and remove from array
    for (var i = 0; i < images.length; i++) {

      if (images[i] === url) {

        images.splice(i, 1);
      }

    }
    this.newimages = images;
    this.dialogRef.close(this.newimages);
  }

  copyImage(option): void {
    //TODO
    console.log(this.workPlanID);
    this.dialogRef.close(this.workPlanID);
  }
}


export interface InstructionDialogData {
  
}

@Component({
  selector: 'instruction-dialog',
  templateUrl: 'instruction-dialog.html',
  styleUrls: ['./new-plan-rada.component.css']
})
export class InstructionDialog {
  text: string;
  equipmentID: string;
  obj: [{ text: string, eqp: string }];
  constructor(
    public dialogRef: MatDialogRef<InstructionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: InstructionDialogData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addInstruction(equipmentID): void {
    this.obj = [{ text: this.text, eqp: equipmentID }];
    console.log(this.text);
    this.dialogRef.close(this.obj);
  }
}
