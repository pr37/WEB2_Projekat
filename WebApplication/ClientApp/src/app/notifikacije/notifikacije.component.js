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
var backend_service_service_1 = require("../backend-service.service");
var http_1 = require("@angular/common/http");
var NotifikacijeComponent = /** @class */ (function () {
    function NotifikacijeComponent(http, backendService) {
        var _this = this;
        this.http = http;
        this.backendService = backendService;
        this.heroesUrl = 'api/Notifications'; // URL to web api
        this.httpOptions = {
            headers: new http_1.HttpHeaders({ 'Content-Type': 'application/json' })
        };
        this.getPodesavanja().subscribe(function (res) {
            console.log('PODESAVANJA:' + res.hideRequiredFields);
            //this.HideFields = res.hideRequiredFields;
            _this.ErrorsVisible = res.errorVisible;
            _this.InfoVisible = res.infoVisible;
            _this.WarningVisible = res.warningVisible;
            _this.SuccessVisible = res.successVisible;
        }, function (err) {
            console.log("Err: " + err);
            alert('Could not get podesavanja.');
        });
        this.userLoggedIn = this.isLoggedIn();
        //TODO get all notifications and filter into unreadNotifications
        if (this.userLoggedIn) {
            this.unreadNotifications = new Array();
            this.tempNotifications = new Array();
            this.allNotifications = new Array();
            this.getNotifications("2").subscribe(function (res) {
                console.log("ffffffff");
                console.log(res);
                res.forEach(function (not) { return _this.allNotifications.push({ id: not.notifikacijaID, text: not.text, color: not.color, icon: not.icon, timestamp: not.timeStamp, tied: not.tied, tiedTo: not.tiedTo, read: not.read }); });
            }, function (err) {
                console.log("Err: " + err);
                alert(err);
            });
            this.getUnreadNotifications("2").subscribe(function (res) {
                console.log("Got unread notifications");
                console.log(res);
                res.forEach(function (not) { return _this.tempNotifications.push({ id: not.notifikacijaID, text: not.text, color: not.color, icon: not.icon, timestamp: not.timeStamp, tied: not.tied, tiedTo: not.tiedTo }); });
                for (var _i = 0, res_1 = res; _i < res_1.length; _i++) {
                    var not = res_1[_i];
                    if (!_this.ErrorsVisible) {
                        if (not.icon !== 'error') {
                            _this.unreadNotifications.push({ id: not.notifikacijaID, text: not.text, color: not.color, icon: not.icon, timestamp: not.timeStamp, tied: not.tied, tiedTo: not.tiedTo });
                        }
                    }
                    else if (!_this.InfoVisible) {
                        if (not.icon !== 'notification_important') {
                            _this.unreadNotifications.push({ id: not.notifikacijaID, text: not.text, color: not.color, icon: not.icon, timestamp: not.timeStamp, tied: not.tied, tiedTo: not.tiedTo });
                        }
                    }
                    else if (!_this.ErrorsVisible && !_this.InfoVisible) {
                        if (not.icon !== 'error' && not.icon !== 'notification_important') {
                            _this.unreadNotifications.push({ id: not.notifikacijaID, text: not.text, color: not.color, icon: not.icon, timestamp: not.timeStamp, tied: not.tied, tiedTo: not.tiedTo });
                        }
                    }
                    else if (!_this.SuccessVisible) {
                        if (not.icon !== 'done_all') {
                            _this.unreadNotifications.push({ id: not.notifikacijaID, text: not.text, color: not.color, icon: not.icon, timestamp: not.timeStamp, tied: not.tied, tiedTo: not.tiedTo });
                        }
                    }
                    else if (!_this.WarningVisible) {
                        if (not.icon !== 'warning') {
                            _this.unreadNotifications.push({ id: not.notifikacijaID, text: not.text, color: not.color, icon: not.icon, timestamp: not.timeStamp, tied: not.tied, tiedTo: not.tiedTo });
                        }
                    }
                    else {
                        _this.unreadNotifications.push({ id: not.notifikacijaID, text: not.text, color: not.color, icon: not.icon, timestamp: not.timeStamp, tied: not.tied, tiedTo: not.tiedTo });
                    }
                }
                // res.forEach(not => this.unreadNotifications.push({ id: not.notifikacijaID, text: not.text, color: not.color, icon: not.icon, timestamp: not.timeStamp, tied: not.tied, tiedTo: not.tiedTo }));
                // res.forEach(not => this.tempNotifications.push({ id: not.notifikacijaID, text: not.text, color: not.color, icon: not.icon, timestamp: not.timeStamp, tied: not.tied, tiedTo: not.tiedTo }));
            }, function (err) {
                console.log("Err: " + err);
                alert(err);
            });
            //this.testnotif.forEach(not => console.log(not));
            //notifs.forEach(not => this.unreadNotifications.push({ id: not.notifikacijaID, text: not.text, color: not.color, icon: not.icon, timestamp: not.timeStamp, tied: not.tied, tiedTo: not.tiedTo }))
            //this.unreadNotifications.push({ id:'1',text: 'testtttttt', color: 'red', icon: 'error', timestamp: '21.10.1998.', tied:false,tiedTo:'' })
            //this.unreadNotifications.push({ id:'2',text: 'testtttttt', color: 'red', icon: 'error', timestamp: '21.10.1998.', tied:false,tiedTo:'' })
            //this.unreadNotifications.push({ id: '3',text: 'testtttttt', color: 'blue', icon: 'notification_important', timestamp: '21.10.1998.', tied:true,tiedTo:'smth' })
            //this.unreadNotifications.push({ id: '4',text: 'testtttttt', color: 'blue', icon: 'notification_important', timestamp: '21.10.1998.', tied:true,tiedTo:'smth' })
            //this.unreadNotifications.push({ id: '5',text: 'testtttttt', color: 'yellow', icon: 'warning', timestamp: '21.10.1998.', tied:true,tiedTo:'smth' })
            //this.unreadNotifications.push({ id: '6',text: 'testtttttt', color: 'yellow', icon: 'warning', timestamp: '21.10.1998.', tied:true,tiedTo:'smth' })
            //this.unreadNotifications.push({ id: '7', text: 'testtttttt', color: 'green', icon: 'done_all', timestamp: '21.10.1998.', tied: true, tiedTo: 'smth' })
            //this.unreadNotifications.push({ id: '8', text: 'testtttttt', color: 'green', icon: 'done_all', timestamp: '21.10.1998.', tied: true, tiedTo: 'smth' })
            //this.unreadNotifications.push({ id: '9', text: 'testtttttt', color: 'green', icon: 'done_all', timestamp: '21.10.1998.', tied: true, tiedTo: 'smth' })
            this.unreadNotifications.forEach(function (val) { return _this.tempNotifications.push(Object.assign({}, val)); });
            if (!this.ErrorsVisible) {
                // alert('aa');
                this.allNotifications = this.allNotifications.filter(function (i) { return i.icon !== 'error'; });
                console.log('hmmmm: ' + this.allNotifications);
                this.unreadNotifications = this.unreadNotifications.filter(function (i) { return i.icon !== 'error'; });
                this.tempNotifications = this.tempNotifications.filter(function (i) { return i.icon !== 'error'; });
            }
        }
    }
    NotifikacijeComponent.prototype.getPodesavanja = function () {
        return this.http.get('https://localhost:44301/Podesavanja/getPodesavanja');
    };
    NotifikacijeComponent.prototype.ngOnInit = function () {
        if (!this.ErrorsVisible) {
            this.allNotifications = this.allNotifications.filter(function (i) { return i.icon != 'error'; });
            console.log('hmmmm: ' + this.unreadNotifications.length);
            this.unreadNotifications = this.unreadNotifications.filter(function (i) { return i.icon !== 'error'; });
            console.log('hmmmm: ' + this.unreadNotifications.length);
            this.tempNotifications = this.tempNotifications.filter(function (i) { return i.icon !== 'error'; });
        }
    };
    NotifikacijeComponent.prototype.isLoggedIn = function () {
        if (localStorage.getItem('currentUser')) {
            console.log('user is logged in');
            return true;
        }
        console.log('user is not logged in');
        return false;
    };
    NotifikacijeComponent.prototype.getNotifications = function (id) {
        return this.http.get('https://localhost:44301/Notifikacije/' + id);
    };
    NotifikacijeComponent.prototype.getUnreadNotifications = function (id) {
        return this.http.get('https://localhost:44301/Notifikacije/unread/' + id);
    };
    NotifikacijeComponent.prototype.sendReadNotif = function (notifId) {
        return this.http.put('https://localhost:44301/Notifikacije/read/' + notifId, notifId);
    };
    NotifikacijeComponent.prototype.markAllRead = function () {
        var _this = this;
        this.unreadNotifications.forEach(function (val) { return _this.sendReadNotif(val.id).subscribe(function (res) {
            console.log("Sent read");
            console.log(res);
        }, function (err) {
            console.log("Err: " + err);
            alert(err);
        }); });
        this.unreadNotifications = new Array();
        this.tempNotifications = new Array();
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
        this.sendReadNotif(id).subscribe(function (res) {
            console.log("Sent read");
            console.log(res);
        }, function (err) {
            console.log("Err: " + err);
            alert(err);
        });
    };
    NotifikacijeComponent.prototype.routeTo = function (tiedTo) {
        //TODO 
    };
    NotifikacijeComponent.prototype.showAll = function () {
        var _this = this;
        this.unreadNotifications = new Array();
        this.getNotifications("2").subscribe(function (res) {
            console.log("Got all notifications");
            console.log(res);
            for (var _i = 0, res_2 = res; _i < res_2.length; _i++) {
                var not = res_2[_i];
                if (!_this.ErrorsVisible) {
                    if (not.icon !== 'error') {
                        _this.unreadNotifications.push({ id: not.notifikacijaID, text: not.text, color: not.color, icon: not.icon, timestamp: not.timeStamp, tied: not.tied, tiedTo: not.tiedTo });
                    }
                }
                else if (!_this.InfoVisible) {
                    if (not.icon !== 'notification_important') {
                        _this.unreadNotifications.push({ id: not.notifikacijaID, text: not.text, color: not.color, icon: not.icon, timestamp: not.timeStamp, tied: not.tied, tiedTo: not.tiedTo });
                    }
                }
                else if (!_this.ErrorsVisible && !_this.InfoVisible) {
                    if (not.icon !== 'error' && not.icon !== 'notification_important') {
                        _this.unreadNotifications.push({ id: not.notifikacijaID, text: not.text, color: not.color, icon: not.icon, timestamp: not.timeStamp, tied: not.tied, tiedTo: not.tiedTo });
                    }
                }
                else if (!_this.SuccessVisible) {
                    if (not.icon !== 'done_all') {
                        _this.unreadNotifications.push({ id: not.notifikacijaID, text: not.text, color: not.color, icon: not.icon, timestamp: not.timeStamp, tied: not.tied, tiedTo: not.tiedTo });
                    }
                }
                else if (!_this.WarningVisible) {
                    if (not.icon !== 'warning') {
                        _this.unreadNotifications.push({ id: not.notifikacijaID, text: not.text, color: not.color, icon: not.icon, timestamp: not.timeStamp, tied: not.tied, tiedTo: not.tiedTo });
                    }
                }
                else {
                    _this.unreadNotifications.push({ id: not.notifikacijaID, text: not.text, color: not.color, icon: not.icon, timestamp: not.timeStamp, tied: not.tied, tiedTo: not.tiedTo });
                }
            }
            //res.forEach(not => this.unreadNotifications.push({ id: not.notifikacijaID, text: not.text, color: not.color, icon: not.icon, timestamp: not.timeStamp, tied: not.tied, tiedTo: not.tiedTo }));
        }, function (err) {
            console.log("Err: " + err);
            alert(err);
        });
        // this.ngOnInit();
    };
    NotifikacijeComponent.prototype.showUnread = function () {
        var _this = this;
        this.unreadNotifications = new Array();
        this.getUnreadNotifications("2").subscribe(function (res) {
            console.log("Got unread notifications");
            console.log(res);
            for (var _i = 0, res_3 = res; _i < res_3.length; _i++) {
                var not = res_3[_i];
                if (!_this.ErrorsVisible) {
                    if (not.icon !== 'error') {
                        _this.unreadNotifications.push({ id: not.notifikacijaID, text: not.text, color: not.color, icon: not.icon, timestamp: not.timeStamp, tied: not.tied, tiedTo: not.tiedTo });
                    }
                }
                else if (!_this.InfoVisible) {
                    if (not.icon !== 'notification_important') {
                        _this.unreadNotifications.push({ id: not.notifikacijaID, text: not.text, color: not.color, icon: not.icon, timestamp: not.timeStamp, tied: not.tied, tiedTo: not.tiedTo });
                    }
                }
                else if (!_this.ErrorsVisible && !_this.InfoVisible) {
                    if (not.icon !== 'error' && not.icon !== 'notification_important') {
                        _this.unreadNotifications.push({ id: not.notifikacijaID, text: not.text, color: not.color, icon: not.icon, timestamp: not.timeStamp, tied: not.tied, tiedTo: not.tiedTo });
                    }
                }
                else if (!_this.SuccessVisible) {
                    if (not.icon !== 'done_all') {
                        _this.unreadNotifications.push({ id: not.notifikacijaID, text: not.text, color: not.color, icon: not.icon, timestamp: not.timeStamp, tied: not.tied, tiedTo: not.tiedTo });
                    }
                }
                else if (!_this.WarningVisible) {
                    if (not.icon !== 'warning') {
                        _this.unreadNotifications.push({ id: not.notifikacijaID, text: not.text, color: not.color, icon: not.icon, timestamp: not.timeStamp, tied: not.tied, tiedTo: not.tiedTo });
                    }
                }
                else {
                    _this.unreadNotifications.push({ id: not.notifikacijaID, text: not.text, color: not.color, icon: not.icon, timestamp: not.timeStamp, tied: not.tied, tiedTo: not.tiedTo });
                }
            }
            // res.forEach(not => this.unreadNotifications.push({ id: not.notifikacijaID, text: not.text, color: not.color, icon: not.icon, timestamp: not.timeStamp, tied: not.tied, tiedTo: not.tiedTo }));
            // res.forEach(not => this.tempNotifications.push({ id: not.notifikacijaID, text: not.text, color: not.color, icon: not.icon, timestamp: not.timeStamp, tied: not.tied, tiedTo: not.tiedTo }));
        }, function (err) {
            console.log("Err: " + err);
            alert(err);
        });
        // this.tempNotifications.forEach(val => this.unreadNotifications.push((<any>Object).assign({}, val)));
        if (!this.ErrorsVisible) {
            // alert('aa');
            this.allNotifications = this.allNotifications.filter(function (i) { return i.icon !== 'error'; });
            console.log('hmmmm: ' + this.allNotifications);
            this.unreadNotifications = this.unreadNotifications.filter(function (i) { return i.icon !== 'error'; });
            this.tempNotifications = this.tempNotifications.filter(function (i) { return i.icon !== 'error'; });
        }
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
            styleUrls: ['./notifikacije.component.css'],
            providers: [backend_service_service_1.BackendServiceService]
        })
    ], NotifikacijeComponent);
    return NotifikacijeComponent;
}());
exports.NotifikacijeComponent = NotifikacijeComponent;
//# sourceMappingURL=notifikacije.component.js.map