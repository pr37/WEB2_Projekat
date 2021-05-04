"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotifikacijeComponent = void 0;
var core_1 = require("@angular/core");
var NotifikacijeComponent = /** @class */ (function () {
    function NotifikacijeComponent() {
        var _this = this;
        //TODO get all notifications and filter into unreadNotifications
        this.unreadNotifications = new Array();
        this.tempNotifications = new Array();
        this.unreadNotifications.push({ id: '1', text: 'testtttttt', color: 'red', icon: 'error', timestamp: '21.10.1998.', tied: false, tiedTo: '' });
        this.unreadNotifications.push({ id: '2', text: 'testtttttt', color: 'red', icon: 'error', timestamp: '21.10.1998.', tied: false, tiedTo: '' });
        this.unreadNotifications.push({ id: '3', text: 'testtttttt', color: 'blue', icon: 'notification_important', timestamp: '21.10.1998.', tied: true, tiedTo: 'smth' });
        this.unreadNotifications.push({ id: '4', text: 'testtttttt', color: 'blue', icon: 'notification_important', timestamp: '21.10.1998.', tied: true, tiedTo: 'smth' });
        this.unreadNotifications.push({ id: '5', text: 'testtttttt', color: 'yellow', icon: 'warning', timestamp: '21.10.1998.', tied: true, tiedTo: 'smth' });
        this.unreadNotifications.push({ id: '6', text: 'testtttttt', color: 'yellow', icon: 'warning', timestamp: '21.10.1998.', tied: true, tiedTo: 'smth' });
        this.unreadNotifications.push({ id: '7', text: 'testtttttt', color: 'green', icon: 'done_all', timestamp: '21.10.1998.', tied: true, tiedTo: 'smth' });
        this.unreadNotifications.push({ id: '8', text: 'testtttttt', color: 'green', icon: 'done_all', timestamp: '21.10.1998.', tied: true, tiedTo: 'smth' });
        this.unreadNotifications.push({ id: '9', text: 'testtttttt', color: 'green', icon: 'done_all', timestamp: '21.10.1998.', tied: true, tiedTo: 'smth' });
        this.unreadNotifications.forEach(function (val) { return _this.tempNotifications.push(Object.assign({}, val)); });
    }
    NotifikacijeComponent.prototype.markAllRead = function () {
        this.unreadNotifications = new Array();
        this.tempNotifications = new Array();
        //TODO update db
    };
    NotifikacijeComponent.prototype.markRead = function (id) {
        for (var i = 0; i < this.unreadNotifications.length; i++) {
            if (this.unreadNotifications[i].id === id) {
                this.unreadNotifications.splice(i, 1);
            }
        }
        for (var i = 0; i < this.tempNotifications.length; i++) {
            if (this.tempNotifications[i].id === id) {
                this.tempNotifications.splice(i, 1);
            }
        }
        //TODO update db
    };
    NotifikacijeComponent.prototype.routeTo = function (tiedTo) {
        //TODO 
    };
    NotifikacijeComponent.prototype.showAll = function () {
    };
    NotifikacijeComponent.prototype.showUnread = function () {
        var _this = this;
        this.unreadNotifications = new Array();
        this.tempNotifications.forEach(function (val) { return _this.unreadNotifications.push(Object.assign({}, val)); });
    };
    NotifikacijeComponent.prototype.showError = function () {
        var _this = this;
        this.unreadNotifications = new Array();
        var result = this.tempNotifications.filter(function (o) { return o.icon === 'error'; });
        result.map(function (val) { return _this.unreadNotifications.push(Object.assign({}, val)); });
    };
    NotifikacijeComponent.prototype.showInfo = function () {
        var _this = this;
        this.unreadNotifications = new Array();
        var result = this.tempNotifications.filter(function (o) { return o.icon === 'notification_important'; });
        result.map(function (val) { return _this.unreadNotifications.push(Object.assign({}, val)); });
    };
    NotifikacijeComponent.prototype.showSuccess = function () {
        var _this = this;
        this.unreadNotifications = new Array();
        var result = this.tempNotifications.filter(function (o) { return o.icon === 'done_all'; });
        result.map(function (val) { return _this.unreadNotifications.push(Object.assign({}, val)); });
    };
    NotifikacijeComponent.prototype.showWarning = function () {
        var _this = this;
        this.unreadNotifications = new Array();
        var result = this.tempNotifications.filter(function (o) { return o.icon === 'warning'; });
        result.map(function (val) { return _this.unreadNotifications.push(Object.assign({}, val)); });
    };
    NotifikacijeComponent = __decorate([
        core_1.Component({
            selector: 'notifikacije',
            templateUrl: './notifikacije.component.html',
            styleUrls: ['./notifikacije.component.css']
        })
    ], NotifikacijeComponent);
    return NotifikacijeComponent;
}());
exports.NotifikacijeComponent = NotifikacijeComponent;
//# sourceMappingURL=notifikacije.component.js.map