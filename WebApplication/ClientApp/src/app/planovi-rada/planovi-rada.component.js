"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanoviRadaComponent = void 0;
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var paginator_1 = require("@angular/material/paginator");
var table_1 = require("@angular/material/table");
var sort_1 = require("@angular/material/sort");
var PlanoviRadaComponent = /** @class */ (function () {
    function PlanoviRadaComponent() {
        this.displayedColumns = ['ID', 'StartDate', 'PhoneNo', 'Status', 'Address', 'Company', 'Type'];
        this.dataSource = new table_1.MatTableDataSource(ELEMENT_DATA);
    }
    PlanoviRadaComponent.prototype.applySearch = function (filterValue) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    };
    PlanoviRadaComponent.prototype.applyFilterStatus = function () {
        this.selectedStatus = this.selectedStatus.trim(); // Remove whitespace
        this.selectedStatus = this.selectedStatus.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = this.selectedStatus;
    };
    PlanoviRadaComponent.prototype.applyFilterType = function () {
        this.selectedType = this.selectedType.trim(); // Remove whitespace
        this.selectedType = this.selectedType.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = this.selectedType;
    };
    PlanoviRadaComponent.prototype.ngAfterViewInit = function () {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    };
    __decorate([
        core_2.ViewChild(paginator_1.MatPaginator)
    ], PlanoviRadaComponent.prototype, "paginator", void 0);
    __decorate([
        core_2.ViewChild(sort_1.MatSort)
    ], PlanoviRadaComponent.prototype, "sort", void 0);
    PlanoviRadaComponent = __decorate([
        core_1.Component({
            selector: 'planovi-rada',
            templateUrl: './planovi-rada.component.html',
            styleUrls: ['./planovi-rada.component.css']
        })
    ], PlanoviRadaComponent);
    return PlanoviRadaComponent;
}());
exports.PlanoviRadaComponent = PlanoviRadaComponent;
var ELEMENT_DATA = [
    { ID: '231', StartDate: '24.4.2021.', PhoneNo: '012434234', Status: 'OK', Address: 'Maje Gojkovic 123', Company: 'ARRT', Type: 'Planirani' },
    { ID: '123', StartDate: '26.4.2021.', PhoneNo: '012434354', Status: 'DRAFT', Address: 'Aleka Vucica 321', Company: 'A33', Type: 'Planirani' },
    { ID: '123', StartDate: '26.4.2021.', PhoneNo: '012434354', Status: 'DRAFT', Address: 'Aleka Vucica 321', Company: 'A33', Type: 'Neplaniran' },
    { ID: '123', StartDate: '26.4.2021.', PhoneNo: '012434354', Status: 'REPLACED', Address: 'Aleka Vucica 321', Company: 'A33', Type: 'Neplaniran' },
];
//# sourceMappingURL=planovi-rada.component.js.map