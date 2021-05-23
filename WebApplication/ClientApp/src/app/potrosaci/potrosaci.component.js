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
var forms_1 = require("@angular/forms");
var core_1 = require("@angular/core");
var paginator_1 = require("@angular/material/paginator");
var table_1 = require("@angular/material/table");
var dialog_1 = require("@angular/material/dialog");
var backend_service_service_1 = require("../backend-service.service");
var forms_2 = require("@angular/forms");
var PotrosaciComponent = /** @class */ (function () {
    function PotrosaciComponent(dialog, http, backendService) {
        var _this = this;
        this.dialog = dialog;
        this.http = http;
        this.backendService = backendService;
        this.displayedColumns = ['ID', 'Ime', 'Prezime', 'Adresa', 'Prioritet', 'PhoneNo', 'Tip', 'Edit', 'Delete'];
        this.dataSource = new table_1.MatTableDataSource(ELEMENT_DATA);
        this.potrosacForm = new forms_2.FormGroup({
            ime: new forms_1.FormControl('', [forms_1.Validators.required]),
            prezime: new forms_1.FormControl(),
            adresa: new forms_1.FormControl(),
            phoneNo: new forms_1.FormControl(),
            tipPotrosaca: new forms_1.FormControl()
        });
        this.getPotrosaci().subscribe(function (res) {
            console.log(res);
            res.forEach(function (not) { return ELEMENT_DATA.push({ ID: not.potrosacID, Ime: not.ime, Prezime: not.prezime, Adresa: not.adresa, PhoneNo: not.phoneNo, Tip: not.tipPotrosaca, Prioritet: '0' }); });
            _this.ngOnInit();
        }, function (err) {
            console.log("Err: " + err);
            alert(err);
        });
    }
    PotrosaciComponent.prototype.ngOnInit = function () {
        this.dataSource = new table_1.MatTableDataSource(ELEMENT_DATA);
    };
    PotrosaciComponent.prototype.ngAfterViewInit = function () {
        this.dataSource.paginator = this.paginator;
    };
    PotrosaciComponent.prototype.getPotrosaci = function () {
        return this.http.get('https://localhost:44301/Potrosaci/get');
    };
    PotrosaciComponent.prototype.editPotrosac = function (id, ime, prezime, asresa, phoneno, tip) {
        return this.http.put('https://localhost:44301/Potrosaci/edit/' + id + '/' + ime + '/' + prezime + '/' + asresa + '/' + phoneno + '/' + tip, null);
    };
    PotrosaciComponent.prototype.deletePotrosac = function (id) {
        return this.http.put('https://localhost:44301/Potrosaci/delete/' + id, id);
    };
    PotrosaciComponent.prototype.addPotrosac = function (ime, prezime, asresa, phoneno, tip) {
        var headers = new Headers({ "X-Requested-With": "XMLHttpRequest", "Content-Type": 'application/json' });
        // return this.http.put('https://localhost:44301/Potrosaci/add', potrosac);
        return this.http.put('https://localhost:44301/Potrosaci/add/' + ime + '/' + prezime + '/' + asresa + '/' + phoneno + '/' + tip, null);
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
            //console.log(result);
            //TODO send to server and refresh collection -- get id
            var body = {
                Ime: result[0].ime,
                Prezime: result[0].prezime,
                Adresa: result[0].adresa,
                PhoneNo: result[0].phoneNo,
                TipPotrosaca: result[0].tipPotrosaca
            };
            console.log(body);
            _this.addPotrosac(result[0].ime, result[0].prezime, result[0].adresa, result[0].phoneNo, result[0].tipPotrosaca).subscribe(function (res) {
                console.log(res);
                //this.ngOnInit();
                ELEMENT_DATA.splice(0, ELEMENT_DATA.length);
                _this.getPotrosaci().subscribe(function (res) {
                    console.log(res);
                    res.forEach(function (not) { return ELEMENT_DATA.push({ ID: not.potrosacID, Ime: not.ime, Prezime: not.prezime, Adresa: not.adresa, PhoneNo: not.phoneNo, Tip: not.tipPotrosaca, Prioritet: '0' }); });
                    _this.ngOnInit();
                }, function (err) {
                    console.log("Err: " + err);
                    alert(err);
                });
            }, function (err) {
                console.log("Err: " + err);
                alert(err);
            });
            //ELEMENT_DATA.push({ ID: 'tbd', Ime: result[0].ime, Prezime: result[0].prezime, Adresa: result[0].adresa, PhoneNo: result[0].phoneno, Tip: result[0].tip, Prioritet: '0' });
            _this.ngOnInit();
        });
    };
    PotrosaciComponent.prototype.edit = function (ID, ime, prz, adr, phn, tp) {
        var _this = this;
        var dialogRef = this.dialog.open(NewPotrosacDialog, {
            data: {
                tipovi: ['Rezidentalni', 'Komercijalni'],
                Ime: ime,
                Prezime: prz,
                Adresa: adr,
                PhoneNo: phn,
                TipPotrosaca: tp
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            var body = {
                PotrosacID: ID,
                Ime: result[0].ime,
                Prezime: result[0].prezime,
                Adresa: result[0].adresa,
                PhoneNo: result[0].phoneNo,
                TipPotrosaca: result[0].tipPotrosaca
            };
            _this.editPotrosac(ID, result[0].ime, result[0].prezime, result[0].adresa, result[0].phoneNo, result[0].tipPotrosaca).subscribe(function (res) {
                console.log(res);
                //this.ngOnInit();
                ELEMENT_DATA.splice(0, ELEMENT_DATA.length);
                _this.getPotrosaci().subscribe(function (res) {
                    console.log(res);
                    res.forEach(function (not) { return ELEMENT_DATA.push({ ID: not.potrosacID, Ime: not.ime, Prezime: not.prezime, Adresa: not.adresa, PhoneNo: not.phoneNo, Tip: not.tipPotrosaca, Prioritet: '0' }); });
                    _this.ngOnInit();
                }, function (err) {
                    console.log("Err: " + err);
                    alert(err);
                });
            }, function (err) {
                console.log("Err: " + err);
                alert(err);
            });
            //TODO send to server and refresh collection -- get id
            // ELEMENT_DATA.push({ ID: 'tbd', Ime: result[0].ime, Prezime: result[0].prezime, Adresa: result[0].adresa, PhoneNo: result[0].phoneno, Tip: result[0].tip, Prioritet: '0' });
            _this.ngOnInit();
        });
    };
    PotrosaciComponent.prototype.delete = function (ID) {
        var _this = this;
        for (var i = 0; i < ELEMENT_DATA.length; i++) {
            if (ELEMENT_DATA[i].ID === ID) {
                ELEMENT_DATA.splice(i, 1);
            }
        }
        this.ngOnInit();
        this.deletePotrosac(ID).subscribe(function (res) {
            console.log(res);
            _this.ngOnInit();
        }, function (err) {
            console.log("Err: " + err);
            alert(err);
        });
    };
    __decorate([
        core_1.ViewChild(paginator_1.MatPaginator)
    ], PotrosaciComponent.prototype, "paginator", void 0);
    PotrosaciComponent = __decorate([
        core_1.Component({
            selector: 'potrosaci',
            templateUrl: './potrosaci.component.html',
            styleUrls: ['./potrosaci.component.css'],
            providers: [backend_service_service_1.BackendServiceService]
        })
    ], PotrosaciComponent);
    return PotrosaciComponent;
}());
exports.PotrosaciComponent = PotrosaciComponent;
var ELEMENT_DATA = [
// { ID: '231', Ime: 'ana', Prezime: 'Anic', Adresa: 'addy1', Prioritet: '2', PhoneNo: '123123', Tip: 'Rezidentalni' },
//{ ID: '331', Ime: 'ana', Prezime: 'Anic', Adresa: 'addy1', Prioritet: '2', PhoneNo: '123123', Tip: 'Komercijalni' },
];
var NewPotrosacDialog = /** @class */ (function () {
    function NewPotrosacDialog(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.ime = data.Ime;
        this.prezime = data.Prezime;
        this.adresa = data.Adresa;
        this.phoneno = data.PhoneNo;
        this.tipp = data.TipPotrosaca;
    }
    NewPotrosacDialog.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    NewPotrosacDialog.prototype.addPotrosac = function (tipp) {
        this.obj = [{ ime: this.ime, prezime: this.prezime, adresa: this.adresa, phoneNo: this.phoneno, tipPotrosaca: tipp }];
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