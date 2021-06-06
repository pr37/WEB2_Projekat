"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoziviComponent = void 0;
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var PoziviComponent = /** @class */ (function () {
    function PoziviComponent(mapsAPILoader, ngZone, http) {
        var _this = this;
        this.mapsAPILoader = mapsAPILoader;
        this.ngZone = ngZone;
        this.http = http;
        this.userLoggedIn = this.isLoggedIn();
        if (this.userLoggedIn) {
            //TODO get pozivvi
            this.Pozivi = new Array();
        }
        this.getUser(this.userId).subscribe(function (res) {
            console.log(res);
            _this.ImePrezimeUser = res[0].ime + ' ' + res[0].prezime;
            _this.AdresaUser = res[0].address;
            _this.role = res[0].role;
        }, function (err) {
            console.log("Err: " + err);
            alert('Could not get user.');
        });
        if (this.role == 'admin') {
            this.getAllPozivi().subscribe(function (res) {
                console.log(res);
                _this.Pozivi.splice(0, _this.Pozivi.length);
                res.forEach(function (p) { return _this.Pozivi.push({ lat: p.latitude, lon: p.longitude, problem: p.problem }); });
                console.log(_this.Pozivi);
            }, function (err) {
                console.log("Err: " + err);
                alert('Could not get pozivi.');
            });
        }
        else if (this.userLoggedIn) {
            this.getPoziviUser().subscribe(function (res) {
                console.log(res);
                _this.Pozivi.splice(0, _this.Pozivi.length);
                res.forEach(function (p) { return _this.Pozivi.push({ lat: p.latitude, lon: p.longitude, problem: p.problem }); });
                console.log(_this.Pozivi);
            }, function (err) {
                console.log("Err: " + err);
                alert('Could not get users pozivi.');
            });
        }
    }
    PoziviComponent.prototype.isLoggedIn = function () {
        if (localStorage.getItem('currentUser')) {
            console.log('user is logged in');
            this.userId = localStorage.getItem('currentUser');
            return true;
        }
        console.log('user is not logged in');
        return false;
    };
    PoziviComponent.prototype.onMouseOver = function (infoWindow, gm) {
        if (gm.lastOpen != null) {
            gm.lastOpen.close();
        }
        gm.lastOpen = infoWindow;
        infoWindow.open();
    };
    PoziviComponent.prototype.addCall = function () {
        if (!this.userLoggedIn) {
        }
        else {
            this.Adresa = this.AdresaUser;
            this.longitude = this.currentLon;
            this.latitude = this.currentLat;
            this.postPoziv().subscribe(function (res) {
                console.log(res);
                alert('Poziv sent.');
            }, function (err) {
                console.log("Err: " + err);
                alert('Could not post poziv.');
            });
        }
        this.ngOnInit();
    };
    PoziviComponent.prototype.addCallAonimously = function () {
        this.Pozivi.push({ lat: this.latitude, lon: this.longitude, problem: this.Problem });
        this.postPoziv().subscribe(function (res) {
            console.log(res);
            alert('Poziv sent.');
        }, function (err) {
            console.log("Err: " + err);
            alert('Could not post poziv.');
        });
    };
    PoziviComponent.prototype.ngOnInit = function () {
        var _this = this;
        //load Places Autocomplete
        this.mapsAPILoader.load().then(function () {
            _this.setCurrentLocation();
            _this.geoCoder = new google.maps.Geocoder;
            var autocomplete = new google.maps.places.Autocomplete(_this.searchElementRef.nativeElement);
            autocomplete.addListener("place_changed", function () {
                _this.ngZone.run(function () {
                    //get the place result
                    var place = autocomplete.getPlace();
                    //verify result
                    if (place.geometry === undefined || place.geometry === null) {
                        return;
                    }
                    //set latitude, longitude and zoom
                    _this.latitude = place.geometry.location.lat();
                    _this.longitude = place.geometry.location.lng();
                    _this.zoom = 12;
                    var components = place.address_components;
                    var street = null;
                    for (var i = 0, component; component = components[i]; i++) {
                        console.log(component);
                        if (component.types[0] == 'route') {
                            street = component['long_name'];
                        }
                    }
                    _this.Adresa = street;
                    alert(street);
                });
            });
        });
    };
    PoziviComponent.prototype.getAddress = function (latitude, longitude) {
        var _this = this;
        this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, function (results, status) {
            console.log(results);
            console.log(status);
            if (status === 'OK') {
                if (results[0]) {
                    _this.zoom = 12;
                    _this.address = results[0].formatted_address;
                }
                else {
                    window.alert('No results found');
                }
            }
            else {
                window.alert('Geocoder failed due to: ' + status);
            }
        });
    };
    PoziviComponent.prototype.getUser = function (id) {
        return this.http.get('https://localhost:44301/Podesavanja/user/' + id);
    };
    PoziviComponent.prototype.getPoziviUser = function () {
        return this.http.get('https://localhost:44301/Pozivi/get/' + this.userId);
    };
    PoziviComponent.prototype.getAllPozivi = function () {
        return this.http.get('https://localhost:44301/Pozivi/getall');
    };
    PoziviComponent.prototype.postPoziv = function () {
        //add/{userid}/{problem}/{adresa}/{longitude}/{latitude}
        return this.http.post('https://localhost:44301/Pozivi/add/' + this.userId + '/' + this.Problem + '/' + this.Adresa + '/' + this.longitude.toString() + '/' + this.latitude.toString(), null);
    };
    PoziviComponent.prototype.setCurrentLocation = function () {
        var _this = this;
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                _this.currentLat = position.coords.latitude;
                _this.currentLon = position.coords.longitude;
                _this.zoom = 15;
                _this.latitude = position.coords.latitude;
                _this.longitude = position.coords.longitude;
                _this.zoom = 15;
            });
        }
    };
    __decorate([
        core_2.ViewChild('search')
    ], PoziviComponent.prototype, "searchElementRef", void 0);
    PoziviComponent = __decorate([
        core_1.Component({
            selector: 'pozivi',
            templateUrl: './pozivi.component.html',
            styleUrls: ['./pozivi.component.css']
        })
    ], PoziviComponent);
    return PoziviComponent;
}());
exports.PoziviComponent = PoziviComponent;
//# sourceMappingURL=pozivi.component.js.map