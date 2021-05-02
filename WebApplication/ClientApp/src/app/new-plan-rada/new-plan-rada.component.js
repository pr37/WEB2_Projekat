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
exports.DialogOverviewExampleDialog = exports.NewPlanRadaComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var operators_1 = require("rxjs/operators");
var dialog_1 = require("@angular/material/dialog");
var NewPlanRadaComponent = /** @class */ (function () {
    function NewPlanRadaComponent(dialog) {
        this.dialog = dialog;
        this.control = new forms_1.FormControl();
        this.svrhe = ['Popravka 123', 'Zamena 22', 'Instalacija ...', 'Provera ...'];
        this.Status = 'DRAFT';
        this.CreatedOn = new forms_1.FormControl(new Date());
        //TODO get values
    }
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
//# sourceMappingURL=new-plan-rada.component.js.map