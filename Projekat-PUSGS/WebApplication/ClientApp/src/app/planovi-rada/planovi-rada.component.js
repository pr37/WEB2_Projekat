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
    function PlanoviRadaComponent(http, backendService, router) {
        var _this = this;
        this.http = http;
        this.backendService = backendService;
        this.router = router;
        this.displayedColumns = ['ID', 'StartDate', 'PhoneNo', 'Status', 'Address', 'Company', 'Type', 'Edit'];
        this.dataSource = new table_1.MatTableDataSource(ELEMENT_DATA);
        this.userLoggedIn = this.isLoggedIn();
        if (this.userLoggedIn) {
            this.getPlanovi().subscribe(function (res) {
                console.log(res);
                ELEMENT_DATA.splice(0, ELEMENT_DATA.length);
                res.forEach(function (not) { return ELEMENT_DATA.push({ ID: not.planRadaID, StartDate: not.startDate, PhoneNo: not.phoneNo, Status: not.status, Address: not.address, Company: not.company, Type: not.tipRada }); });
                _this.ngOnInit();
            }, function (err) {
                console.log("Err: " + err);
                alert(err);
            });
        }
    }
    PlanoviRadaComponent.prototype.ngOnInit = function () {
        this.dataSource = new table_1.MatTableDataSource(ELEMENT_DATA);
    };
    PlanoviRadaComponent.prototype.isLoggedIn = function () {
        if (localStorage.getItem('currentUser')) {
            console.log('user is logged in');
            return true;
        }
        console.log('user is not logged in');
        return false;
    };
    PlanoviRadaComponent.prototype.edit = function (planId) {
        localStorage.setItem('selectedPlan', planId);
        this.router.navigate(['/new-plan-rada']);
    };
    PlanoviRadaComponent.prototype.goDoAdd = function () {
        localStorage.setItem('selectedPlan', '');
        this.router.navigate(['/new-plan-rada']);
    };
    PlanoviRadaComponent.prototype.showAll = function () {
        var _this = this;
        ELEMENT_DATA.splice(0, ELEMENT_DATA.length);
        this.getPlanovi().subscribe(function (res) {
            console.log(res);
            res.forEach(function (not) { return ELEMENT_DATA.push({ ID: not.planRadaID, StartDate: not.startDate, PhoneNo: not.phoneNo, Status: not.status, Address: not.address, Company: not.company, Type: not.tipRada }); });
            _this.ngOnInit();
        }, function (err) {
            console.log("Err: " + err);
            alert(err);
        });
    };
    PlanoviRadaComponent.prototype.showMine = function () {
        var _this = this;
        //TODO get logged in users id
        ELEMENT_DATA.splice(0, ELEMENT_DATA.length);
        var id = localStorage.getItem('currentUser');
        this.getMine(id).subscribe(function (res) {
            console.log(res);
            res.forEach(function (not) { return ELEMENT_DATA.push({ ID: not.planRadaID, StartDate: not.startDate, PhoneNo: not.phoneNo, Status: not.status, Address: not.address, Company: not.company, Type: not.tipRada }); });
            _this.ngOnInit();
        }, function (err) {
            console.log("Err: " + err);
            alert(err);
        });
    };
    PlanoviRadaComponent.prototype.getUser = function (id) {
        return this.http.get('https://localhost:44301/Podesavanja/user/' + id);
    };
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
    PlanoviRadaComponent.prototype.getPlanovi = function () {
        return this.http.get('https://localhost:44301/PlanoviRada/getall');
    };
    PlanoviRadaComponent.prototype.getMine = function (id) {
        return this.http.get('https://localhost:44301/PlanoviRada/getmy/' + id);
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
//{ ID: '231', StartDate: '24.4.2021.', PhoneNo: '012434234', Status: 'OK', Address: 'Maje Gojkovic 123', Company: 'ARRT' , Type: 'Planirani'},
//{ ID: '123', StartDate: '26.4.2021.', PhoneNo: '012434354', Status: 'DRAFT', Address: 'Aleka Vucica 321', Company: 'A33', Type: 'Planirani'},
// { ID: '123', StartDate: '26.4.2021.', PhoneNo: '012434354', Status: 'DRAFT', Address: 'Aleka Vucica 321', Company: 'A33', Type: 'Neplaniran' },
//{ ID: '123', StartDate: '26.4.2021.', PhoneNo: '012434354', Status: 'REPLACED', Address: 'Aleka Vucica 321', Company: 'A33', Type: 'Neplaniran' },
];
//# sourceMappingURL=planovi-rada.component.js.map