"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PodesavanjaComponent = void 0;
var core_1 = require("@angular/core");
var table_1 = require("@angular/material/table");
var PodesavanjaComponent = /** @class */ (function () {
    function PodesavanjaComponent(http) {
        var _this = this;
        this.http = http;
        this.displayedColumns = ['Requests', 'Approve'];
        this.dataSource = new table_1.MatTableDataSource(ELEMENT_DATA);
        this.Error = false;
        this.Warning = false;
        this.Info = false;
        this.Success = false;
        this.HideFields = false;
        this.userLoggedIn = false;
        this.userLoggedIn = this.isLoggedIn();
        if (this.userLoggedIn) {
            this.NewPassword = '';
            this.hide = true;
            //TODO get values
            //TODO get set notifications
            //this.isAdmin = true;
            // this.ngOnInit();
            this.streets = [];
            this.getUlice().subscribe(function (res) {
                console.log(res);
                _this.streets.splice(0, _this.streets.length);
                res.forEach(function (st) { return _this.streets.push(st); });
            }, function (err) {
                console.log("Err: " + err);
                alert('Could not get user.');
            });
            this.loggedInId = localStorage.getItem('currentUser');
            this.getUser(this.loggedInId).subscribe(function (res) {
                console.log(res);
                console.log(_this.loggedInId);
                if (res[0].role != 'admin') {
                    _this.isAdmin = false;
                }
                else {
                    _this.isAdmin = true;
                }
            }, function (err) {
                console.log("Err: " + err);
                alert('Could not get user.');
            });
            this.getPodesavanja().subscribe(function (res) {
                console.log(res);
                _this.Error = res.errorVisible;
                _this.Warning = res.warningVisible;
                _this.Info = res.infoVisible;
                _this.Success = res.successVisible;
                _this.HideFields = res.hideRequiredFields;
            }, function (err) {
                console.log("Err: " + err);
                alert('Could not get podesavanja.');
            });
            ELEMENT_DATA.splice(0, ELEMENT_DATA.length);
            this.getRequests().subscribe(function (res) {
                console.log(res);
                ELEMENT_DATA.splice(0, ELEMENT_DATA.length);
                res.forEach(function (r) { return ELEMENT_DATA.push({ Request: r }); });
            }, function (err) {
                console.log("Err: " + err);
                alert('Could not get requested roles.');
            });
        }
    }
    PodesavanjaComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getUser(this.loggedInId).subscribe(function (res) {
            console.log(res);
            if (res[0].role != 'admin') {
                _this.isAdmin = false;
            }
            else {
                _this.isAdmin = true;
            }
        }, function (err) {
            console.log("Err: " + err);
            alert('Could not get user.');
        });
        this.getPodesavanja().subscribe(function (res) {
            console.log(res);
            _this.Error = res.errorVisible;
            _this.Warning = res.warningVisible;
            _this.Info = res.infoVisible;
            _this.Success = res.successVisible;
            _this.HideFields = res.hideRequiredFields;
        }, function (err) {
            console.log("Err: " + err);
            alert('Could not get podesavanja.');
        });
        this.streets = [];
        this.getUlice().subscribe(function (res) {
            var unique;
            _this.streets.splice(0, _this.streets.length);
            res.forEach(function (st) { return _this.streets.push(st); });
            // res.forEach(st => this.streets.push(st));
            var distinct = [];
            distinct = _this.streets.filter(function (n, i) { return _this.streets.indexOf(n) === i; });
            console.log('DISTINCT:' + distinct);
            _this.streets.splice(0, _this.streets.length);
            distinct.forEach(function (st) { return _this.streets.push(st); });
        }, function (err) {
            console.log("Err: " + err);
            alert('Could not get user.');
        });
        this.getRequests().subscribe(function (res) {
            console.log(res);
            ELEMENT_DATA.splice(0, ELEMENT_DATA.length);
            res.forEach(function (r) { return ELEMENT_DATA.push({ Request: r }); });
        }, function (err) {
            console.log("Err: " + err);
            alert('Could not get requested roles.');
        });
        this.dataSource = new table_1.MatTableDataSource(ELEMENT_DATA);
    };
    PodesavanjaComponent.prototype.approve = function (request) {
        var _this = this;
        var splitted = request.split("~", 6);
        console.log(splitted);
        this.postRequest(splitted[1], splitted[5]).subscribe(function (res) {
            console.log(res);
            alert('Role approved.');
            _this.ngOnInit();
        }, function (err) {
            console.log("Err: " + err);
            alert('Could not approve role.');
        });
        this.ngOnInit();
    };
    PodesavanjaComponent.prototype.getUser = function (id) {
        console.log('https://localhost:44301/Podesavanja/user/' + id);
        return this.http.get('https://localhost:44301/Podesavanja/user/' + id);
    };
    PodesavanjaComponent.prototype.getPodesavanja = function () {
        return this.http.get('https://localhost:44301/Podesavanja/getPodesavanja');
    };
    PodesavanjaComponent.prototype.getUlice = function () {
        return this.http.get('https://localhost:44301/Podesavanja/getStreets');
    };
    PodesavanjaComponent.prototype.getRequests = function () {
        return this.http.get('https://localhost:44301/Podesavanja/getRequestedRole');
    };
    PodesavanjaComponent.prototype.postPrioritet = function (street, prioritet) {
        return this.http.post('https://localhost:44301/Podesavanja/setPrioritet/' + street + '/' + prioritet.toString(), null);
    };
    PodesavanjaComponent.prototype.postPassword = function (password) {
        return this.http.post('https://localhost:44301/Podesavanja/setPassword/' + this.loggedInId + '/' + password, null);
    };
    PodesavanjaComponent.prototype.postRequest = function (id, requested) {
        return this.http.post('https://localhost:44301/Podesavanja/approveRole/' + id + '/' + requested, null);
    };
    PodesavanjaComponent.prototype.addPodesavanja = function () {
        //set/{error}/{warning}/{info}/{success}/{hide}
        return this.http.post('https://localhost:44301/Podesavanja/set/' + this.Error.toString() + '/' + this.Warning.toString() + '/' + this.Info.toString() + '/' + this.Success.toString() + '/' + this.HideFields.toString(), null);
    };
    PodesavanjaComponent.prototype.isLoggedIn = function () {
        if (localStorage.getItem('currentUser')) {
            console.log('user is logged in');
            return true;
        }
        console.log('user is not logged in');
        return false;
    };
    PodesavanjaComponent.prototype.changePassword = function () {
        if (this.NewPassword == '') {
            alert('Enter a password.');
            return;
        }
        this.postPassword(this.NewPassword).subscribe(function (res) {
            console.log(res);
            alert('Password changed.');
        }, function (err) {
            console.log("Err: " + err);
            alert('Could not reset password.');
        });
    };
    PodesavanjaComponent.prototype.setPriority = function () {
        console.log(this.Street + " " + this.Priority);
        if (this.Street == "none") {
            alert('Select a street to set priority.');
            return;
        }
        this.postPrioritet(this.Street, this.Priority).subscribe(function (res) {
            console.log(res);
            alert('Prioritet setovan.');
        }, function (err) {
            console.log("Err: " + err);
            alert('Could not set prioritet.');
        });
    };
    PodesavanjaComponent.prototype.valueChangeError = function ($event) {
        //set the two-way binding here for the specific unit with the event
        this.Error = $event.checked;
    };
    PodesavanjaComponent.prototype.valueChangeWarning = function ($event) {
        //set the two-way binding here for the specific unit with the event
        this.Warning = $event.checked;
        console.log(this.Warning);
    };
    PodesavanjaComponent.prototype.valueChangeInfo = function ($event) {
        //set the two-way binding here for the specific unit with the event
        this.Info = $event.checked;
    };
    PodesavanjaComponent.prototype.valueChangeSuccess = function ($event) {
        //set the two-way binding here for the specific unit with the event
        this.Success = $event.checked;
    };
    PodesavanjaComponent.prototype.valueChangeHide = function ($event) {
        //set the two-way binding here for the specific unit with the event
        this.HideFields = $event.checked;
    };
    PodesavanjaComponent.prototype.setNotifications = function () {
        console.log(this.Warning);
        this.addPodesavanja().subscribe(function (res) {
            console.log(res);
            alert('Settings are changed.');
        }, function (err) {
            console.log("Err: " + err);
            alert('Could not set new settings.');
        });
    };
    PodesavanjaComponent.prototype.resetDefault = function () {
        this.Error = false;
        this.Warning = false;
        this.Info = false;
        this.Success = false;
        this.HideFields = false;
        this.addPodesavanja().subscribe(function (res) {
            console.log(res);
        }, function (err) {
            console.log("Err: " + err);
            alert('Could not set new settings.');
        });
        // this.ngOnInit();
    };
    PodesavanjaComponent = __decorate([
        core_1.Component({
            selector: 'podesavanja',
            templateUrl: './podesavanja.component.html',
            styleUrls: ['./podesavanja.component.css']
        })
    ], PodesavanjaComponent);
    return PodesavanjaComponent;
}());
exports.PodesavanjaComponent = PodesavanjaComponent;
var ELEMENT_DATA = [];
//# sourceMappingURL=podesavanja.component.js.map