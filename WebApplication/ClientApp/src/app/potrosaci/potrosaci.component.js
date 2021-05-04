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
exports.NewPotrosacDialog = exports.PotrosaciComponent = void 0;
var core_1 = require("@angular/core");
var paginator_1 = require("@angular/material/paginator");
var table_1 = require("@angular/material/table");
var dialog_1 = require("@angular/material/dialog");
var PotrosaciComponent = /** @class */ (function () {
    function PotrosaciComponent(dialog) {
        this.dialog = dialog;
        this.displayedColumns = ['ID', 'Ime', 'Prezime', 'Adresa', 'Prioritet', 'PhoneNo', 'Tip', 'Edit', 'Delete'];
        this.dataSource = new table_1.MatTableDataSource(ELEMENT_DATA);
    }
    PotrosaciComponent.prototype.ngOnInit = function () {
        this.dataSource = new table_1.MatTableDataSource(ELEMENT_DATA);
    };
    PotrosaciComponent.prototype.ngAfterViewInit = function () {
        this.dataSource.paginator = this.paginator;
    };
    PotrosaciComponent.prototype.openDialog = function () {
        var _this = this;
        var dialogRef = this.dialog.open(NewPotrosacDialog, {
            data: {
                tipovi: ['Rezidentalni', 'Komercijalni'],
                ime: '',
                prezime: '',
                adresa: '',
                phoneno: '',
                tip: ''
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            //TODO send to server and refresh collection -- get id
            ELEMENT_DATA.push({ ID: 'tbd', Ime: result[0].ime, Prezime: result[0].prezime, Adresa: result[0].adresa, PhoneNo: result[0].phoneno, Tip: result[0].tip, Prioritet: '0' });
            _this.ngOnInit();
        });
    };
    PotrosaciComponent.prototype.edit = function (ID, ime, prz, adr, phn, tp) {
        var _this = this;
        var dialogRef = this.dialog.open(NewPotrosacDialog, {
            data: {
                tipovi: ['Rezidentalni', 'Komercijalni'],
                ime: ime,
                prezime: prz,
                adresa: adr,
                phoneno: phn,
                tip: tp
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            //TODO send to server and refresh collection -- get id
            ELEMENT_DATA.push({ ID: 'tbd', Ime: result[0].ime, Prezime: result[0].prezime, Adresa: result[0].adresa, PhoneNo: result[0].phoneno, Tip: result[0].tip, Prioritet: '0' });
            _this.ngOnInit();
        });
    };
    PotrosaciComponent.prototype.delete = function (ID) {
        for (var i = 0; i < ELEMENT_DATA.length; i++) {
            if (ELEMENT_DATA[i].ID === ID) {
                ELEMENT_DATA.splice(i, 1);
            }
        }
        this.ngOnInit();
    };
    __decorate([
        core_1.ViewChild(paginator_1.MatPaginator)
    ], PotrosaciComponent.prototype, "paginator", void 0);
    PotrosaciComponent = __decorate([
        core_1.Component({
            selector: 'potrosaci',
            templateUrl: './potrosaci.component.html',
            styleUrls: ['./potrosaci.component.css']
        })
    ], PotrosaciComponent);
    return PotrosaciComponent;
}());
exports.PotrosaciComponent = PotrosaciComponent;
var ELEMENT_DATA = [
    { ID: '231', Ime: 'ana', Prezime: 'Anic', Adresa: 'addy1', Prioritet: '2', PhoneNo: '123123', Tip: 'Rezidentalni' },
    { ID: '331', Ime: 'ana', Prezime: 'Anic', Adresa: 'addy1', Prioritet: '2', PhoneNo: '123123', Tip: 'Komercijalni' },
];
var NewPotrosacDialog = /** @class */ (function () {
    function NewPotrosacDialog(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.ime = data.ime;
        this.prezime = data.prezime;
        this.adresa = data.adresa;
        this.phoneno = data.phoneno;
        this.tipp = data.tip;
    }
    NewPotrosacDialog.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    NewPotrosacDialog.prototype.addPotrosac = function (tipp) {
        this.obj = [{ ime: this.ime, prezime: this.prezime, adresa: this.adresa, phoneno: this.phoneno, tip: tipp }];
        this.dialogRef.close(this.obj);
    };
    NewPotrosacDialog = __decorate([
        core_1.Component({
            selector: 'new-potrosac-dialog',
            templateUrl: 'new-potrosac-dialog.html',
            styleUrls: ['./potrosaci.component.css']
        }),
        __param(1, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], NewPotrosacDialog);
    return NewPotrosacDialog;
}());
exports.NewPotrosacDialog = NewPotrosacDialog;
//# sourceMappingURL=potrosaci.component.js.map