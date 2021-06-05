"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstructionDialog = exports.ImageDialog = exports.DialogOverviewExampleDialog = exports.NewPlanRadaComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var operators_1 = require("rxjs/operators");
var dialog_1 = require("@angular/material/dialog");
var paginator_1 = require("@angular/material/paginator");
var table_1 = require("@angular/material/table");
var ELEMENT_DATA = [
    { UserID: 'asd22', ChangedDate: 'test' },
    { UserID: 'asd22', ChangedDate: 'test' },
    { UserID: 'asd22', ChangedDate: 'test' },
    { UserID: 'asd22', ChangedDate: 'test' },
    { UserID: 'asd22', ChangedDate: 'test' },
    { UserID: 'asd22', ChangedDate: 'test' },
    { UserID: 'asd22', ChangedDate: 'test' }
];
var NewPlanRadaComponent = /** @class */ (function () {
    function NewPlanRadaComponent(dialog, _snackBar, http, backendService) {
        this.dialog = dialog;
        this._snackBar = _snackBar;
        this.http = http;
        this.backendService = backendService;
        this.displayedColumns = ['UserID', 'ChangedDate'];
        this.dataSource = new table_1.MatTableDataSource(ELEMENT_DATA);
        this.control = new forms_1.FormControl();
        this.svrhe = ['Popravka 123', 'Zamena 22', 'Instalacija ...', 'Provera ...'];
        this.uploading = false;
        this.ShowBasic = true;
        this.ShowHistory = false;
        this.ShowMultimedia = false;
        this.ShowEquipment = false;
        this.ShowInstructions = false;
        this.Status = 'DRAFT';
        this.Address = '';
        this.CreatedOn = new forms_1.FormControl(new Date());
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
    NewPlanRadaComponent.prototype.ngAfterViewInit = function () {
        this.dataSource.paginator = this.paginator;
    };
    NewPlanRadaComponent.prototype.isLoggedIn = function () {
        if (localStorage.getItem('currentUser')) {
            console.log('user is logged in');
            return true;
        }
        console.log('user is not logged in');
        return false;
    };
    NewPlanRadaComponent.prototype.openSnackBar = function (message, action) {
        this._snackBar.open(message, action);
    };
    NewPlanRadaComponent.prototype.showBasic = function () {
        this.ShowBasic = true;
        this.ShowHistory = false;
        this.ShowMultimedia = false;
        this.ShowEquipment = false;
        this.ShowInstructions = false;
    };
    NewPlanRadaComponent.prototype.showHistory = function () {
        this.ShowBasic = false;
        this.ShowHistory = true;
        this.ShowMultimedia = false;
        this.ShowEquipment = false;
        this.ShowInstructions = false;
    };
    NewPlanRadaComponent.prototype.showMultimedia = function () {
        this.ShowBasic = false;
        this.ShowHistory = false;
        this.ShowMultimedia = true;
        this.ShowEquipment = false;
        this.ShowInstructions = false;
    };
    NewPlanRadaComponent.prototype.showEquipment = function () {
        this.ShowBasic = false;
        this.ShowHistory = false;
        this.ShowMultimedia = false;
        this.ShowEquipment = true;
        this.ShowInstructions = false;
    };
    NewPlanRadaComponent.prototype.showInstructions = function () {
        this.ShowBasic = false;
        this.ShowHistory = false;
        this.ShowMultimedia = false;
        this.ShowEquipment = false;
        this.ShowInstructions = true;
    };
    NewPlanRadaComponent.prototype.addNewWorkPlan = function () {
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
            + " " + this.Details + " " + this.Notes + " " + this.Address + " " + this.FromDate + " " + this.ToDate);
    };
    NewPlanRadaComponent.prototype.addNew = function (createdby, status, datecreated, company, tipnacemu, startdate, enddate, adresa, svrha, beleske) {
        //add/{createdby}/{status}/{datecreated}/{company}/{tipnacemu}/{startdate}/{enddate}/{adresa}/{svrha}/{beleske}/{detalji}/{tiprada}/{phoneno}
        return this.http.get('https://localhost:44301/PlanoviRada/add');
    };
    NewPlanRadaComponent.prototype.approveDocument = function () {
        this.Status = 'APPROVED';
    };
    NewPlanRadaComponent.prototype.denyDocument = function () {
        this.Status = 'DENIED';
    };
    NewPlanRadaComponent.prototype.cancelDocument = function () {
        this.Status = 'CANCELED';
    };
    NewPlanRadaComponent.prototype.addEquipment = function () {
    };
    NewPlanRadaComponent.prototype.removeEquipment = function () {
    };
    NewPlanRadaComponent.prototype.executeInstruction = function (id) {
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
    };
    NewPlanRadaComponent.prototype.deleteInstruction = function (id) {
        for (var i = 0; i < this.instructions.length; i++) {
            if (this.instructions[i].id === id) {
                this.instructions.splice(i, 1);
            }
        }
        //TODO update db
    };
    NewPlanRadaComponent.prototype.validateInstructions = function () {
        this.adresaElementa = "test"; //TODO GET
        //TODO nalog za rad-plan rada-adrese
        if (this.Address === this.adresaElementa) {
            for (var i = 0; i < this.instructions.length; i++) {
                this.instructions[i].validated = "VALIDATED";
            }
        }
    };
    NewPlanRadaComponent.prototype.deleteAllInstructions = function () {
        this.instructions.splice(0, this.instructions.length);
        //TODO update db
    };
    NewPlanRadaComponent.prototype.addNewInstructionDialog = function () {
        var _this = this;
        var dialogRef = this.dialog.open(InstructionDialog, {
            data: {
                equipments: this.equipments
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            _this.instructions.push({ id: "2a", text: result[0].text, executed: "UNEXECUTED", equipment: result[0].eqp, validated: "NOT VALIDATED" });
            //TODO send to server and refresh collection -- get id
        });
    };
    NewPlanRadaComponent.prototype.onSelectFile = function (event) {
        var _this = this;
        if (event.target.files && event.target.files[0]) {
            this.uploading = true;
            var reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]); // read file as data url
            reader.onload = function (event) {
                _this.url = event.target.result;
                console.log(_this.url);
                _this.images.push(_this.url);
                _this.uploading = false;
                _this.ngOnInit();
            };
        }
    };
    NewPlanRadaComponent.prototype.handleImage = function (image) {
        var _this = this;
        var dialogRef = this.dialog.open(ImageDialog, {
            data: {
                url: image,
                images: this.images,
                options: this.allWorkPlanIDs
            }
        });
        console.log(image);
        dialogRef.afterClosed().subscribe(function (result) {
            //console.log(result);
            console.log(Array.isArray(result));
            if (Array.isArray(result)) {
                _this.images = result;
            }
            else if (result != undefined || result != null) {
                //copy into work plan
                console.log(result);
                _this.copyToWorkPlanID = result;
            }
        });
    };
    NewPlanRadaComponent.prototype.openDialog = function () {
        var _this = this;
        var dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
            data: { options: ['crew1', 'crew2'] }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            _this.crewID = result;
        });
    };
    NewPlanRadaComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.filteredSvrhe = this.control.valueChanges.pipe(operators_1.startWith(''), operators_1.map(function (value) { return _this._filter(value); }));
    };
    NewPlanRadaComponent.prototype._filter = function (value) {
        var _this = this;
        var filterValue = this._normalizeValue(value);
        return this.svrhe.filter(function (svrha) { return _this._normalizeValue(svrha).indexOf(filterValue) !== -1; });
    };
    NewPlanRadaComponent.prototype._normalizeValue = function (value) {
        return value.toLowerCase().replace(/\s/g, '');
    };
    __decorate([
        core_1.ViewChild(paginator_1.MatPaginator)
    ], NewPlanRadaComponent.prototype, "paginator", void 0);
    NewPlanRadaComponent = __decorate([
        core_1.Component({
            selector: 'new-plan-rada',
            templateUrl: './new-plan-rada.component.html',
            styleUrls: ['./new-plan-rada.component.css']
        })
    ], NewPlanRadaComponent);
    return NewPlanRadaComponent;
}());
exports.NewPlanRadaComponent = NewPlanRadaComponent;
var DialogOverviewExampleDialog = /** @class */ (function () {
    function DialogOverviewExampleDialog(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    DialogOverviewExampleDialog.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    DialogOverviewExampleDialog.prototype.confirmSelection = function () {
        this.dialogRef.close(this.crewID);
    };
    DialogOverviewExampleDialog = __decorate([
        core_1.Component({
            selector: 'dialog-overview-example-dialog',
            templateUrl: 'dialog-overview-example-dialog.html',
            styleUrls: ['./new-plan-rada.component.css']
        }),
        __param(1, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], DialogOverviewExampleDialog);
    return DialogOverviewExampleDialog;
}());
exports.DialogOverviewExampleDialog = DialogOverviewExampleDialog;
var ImageDialog = /** @class */ (function () {
    function ImageDialog(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    ImageDialog.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    ImageDialog.prototype.deleteImage = function (url, images) {
        console.log(url);
        //TODO remove from DB and remove from array
        for (var i = 0; i < images.length; i++) {
            if (images[i] === url) {
                images.splice(i, 1);
            }
        }
        this.newimages = images;
        this.dialogRef.close(this.newimages);
    };
    ImageDialog.prototype.copyImage = function (option) {
        //TODO
        console.log(this.workPlanID);
        this.dialogRef.close(this.workPlanID);
    };
    ImageDialog = __decorate([
        core_1.Component({
            selector: 'image-dialog',
            templateUrl: 'image-dialog.html',
            styleUrls: ['./new-plan-rada.component.css']
        }),
        __param(1, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], ImageDialog);
    return ImageDialog;
}());
exports.ImageDialog = ImageDialog;
var InstructionDialog = /** @class */ (function () {
    function InstructionDialog(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    InstructionDialog.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    InstructionDialog.prototype.addInstruction = function (equipmentID) {
        this.obj = [{ text: this.text, eqp: equipmentID }];
        console.log(this.text);
        this.dialogRef.close(this.obj);
    };
    InstructionDialog = __decorate([
        core_1.Component({
            selector: 'instruction-dialog',
            templateUrl: 'instruction-dialog.html',
            styleUrls: ['./new-plan-rada.component.css']
        }),
        __param(1, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], InstructionDialog);
    return InstructionDialog;
}());
exports.InstructionDialog = InstructionDialog;
//# sourceMappingURL=new-plan-rada.component.js.map