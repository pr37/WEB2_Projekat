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
var PodesavanjaComponent = /** @class */ (function () {
    function PodesavanjaComponent(http) {
        this.http = http;
        this.userLoggedIn = this.isLoggedIn();
        if (this.userLoggedIn) {
            this.NewPassword = '';
            this.hide = true;
            //TODO get values
            //TODO get set notifications
            this.isAdmin = true;
            this.streets = [];
            this.streets.push('asd');
            this.streets.push('dsa');
            this.streets.push('wer');
            this.loggedInId = localStorage.getItem('currentUser');
            this.getUser(this.loggedInId).subscribe(function (res) {
                console.log(res);
                // res.forEach(not => ELEMENT_DATA.push({ ID: not.planRadaID, StartDate: not.startDate, PhoneNo: not.phoneNo, Status: not.status, Address: not.address, Company: not.company, Type: not.tipRada }));
                // this.ngOnInit();
            }, function (err) {
                console.log("Err: " + err);
                alert('Could not get user.');
            });
        }
    }
    PodesavanjaComponent.prototype.getUser = function (id) {
        return this.http.get('https://localhost:44301/Podesavanja/user/' + id);
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
        //TODO get user id, newpwd, send to DB
    };
    PodesavanjaComponent.prototype.setPriority = function () {
        console.log(this.Street + " " + this.Priority);
    };
    PodesavanjaComponent.prototype.setNotifications = function () {
        console.log(this.Error + " " + this.Warning);
        //TODO send this to DB and implement in notifications
    };
    PodesavanjaComponent.prototype.hideFields = function () {
        //TODO send to DB and implement in new document
    };
    PodesavanjaComponent.prototype.resetDefault = function () {
        //TODO all notifications, all fields
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
//# sourceMappingURL=podesavanja.component.js.map