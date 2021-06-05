"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProfileComponent = exports.MyErrorStateMatcher = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
/** Error when invalid control is dirty, touched, or submitted. */
var MyErrorStateMatcher = /** @class */ (function () {
    function MyErrorStateMatcher() {
    }
    MyErrorStateMatcher.prototype.isErrorState = function (control, form) {
        var isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    };
    return MyErrorStateMatcher;
}());
exports.MyErrorStateMatcher = MyErrorStateMatcher;
var UserProfileComponent = /** @class */ (function () {
    function UserProfileComponent(http, sanitizer) {
        var _this = this;
        this.http = http;
        this.sanitizer = sanitizer;
        this.emailFormControl = new forms_1.FormControl('', [
            forms_1.Validators.required,
            forms_1.Validators.email,
        ]);
        this.uploadFile = function (files) {
            _this.uploading = true;
            if (files.length === 0) {
                return;
            }
            var fileToUpload = files[0];
            _this.fileImgFormData = new FormData();
            _this.fileImgFormData.append('file', fileToUpload, fileToUpload.name);
            var reader = new FileReader();
            reader.readAsDataURL(files[0]); // read file as data url
            reader.onload = function (event) {
                _this.url = event.target.result;
                _this.uploading = false;
            };
        };
        this.matcher = new MyErrorStateMatcher();
        this.uploading = false;
        this.userLoggedIn = this.isLoggedIn();
        this.loggedInId = localStorage.getItem('currentUser');
        this.ngOnInit();
    }
    UserProfileComponent.prototype.isLoggedIn = function () {
        if (localStorage.getItem('currentUser')) {
            return true;
        }
        return false;
    };
    UserProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getUser(this.loggedInId).subscribe(function (res) {
            console.log(res);
            _this.Email = res[0].email;
            _this.Username = res[0].username;
            _this.Name = res[0].ime;
            _this.Lastname = res[0].prezime;
            _this.DateBirth = res[0].dateOfBirth;
            _this.Address = res[0].address;
            _this.Role = res[0].role;
        }, function (err) {
            console.log("Err: " + err);
            alert('Could not get user.');
        });
        this.getImage(this.loggedInId)
            .subscribe(function (baseImage) {
            //alert(JSON.stringify(baseImage));
            var aaa = JSON.stringify(baseImage);
            var re = aaa.slice(1, -1);
            var objectURL = 'data:image/jpg;base64,' + re;
            _this.url = _this.sanitizer.bypassSecurityTrustUrl(objectURL);
        });
    };
    UserProfileComponent.prototype.fieldValidation = function (str) {
        // console.log('t');
        if (str == 'username') {
            // console.log(this.Username);
            if (this.Username == '') {
                return true;
            }
        }
        else if (str == 'firstname') {
            if (this.Name == '') {
                return true;
            }
        }
        else if (str == 'lastname') {
            if (this.Lastname == '') {
                return true;
            }
        }
        else if (str == 'address') {
            if (this.Address == '') {
                return true;
            }
        }
        return false;
    };
    UserProfileComponent.prototype.getUser = function (id) {
        return this.http.get('https://localhost:44301/Podesavanja/user/' + id);
    };
    UserProfileComponent.prototype.getImage = function (id) {
        return this.http.get('https://localhost:44301/Podesavanja/image/' + id);
    };
    UserProfileComponent.prototype.editUser = function () {
        return this.http.post('https://localhost:44301/Podesavanja/edit/' + this.loggedInId + '/' + this.Username + '/' + this.Email + '/' + this.Name + '/' + this.Lastname + '/' + this.DateBirth.toString() + '/' + this.Address + '/' + this.Role, this.fileImgFormData);
    };
    UserProfileComponent.prototype.DisposeChanges = function () {
        this.ngOnInit();
    };
    UserProfileComponent.prototype.Apply = function () {
        if (!this.fieldValidation('username') && !this.fieldValidation('firstname') && !this.fieldValidation('lastname') && !this.fieldValidation('address')) {
            this.editUser().subscribe(function (res) {
                console.log(res);
                alert('User profile updated.');
            }, function (err) {
                console.log("Err: " + err.toString());
                alert('User with this username or email already exists.');
            });
        }
        else {
            alert('Please fill all required fields.');
        }
    };
    UserProfileComponent.prototype.onSelectFile = function (event) {
        var _this = this;
        if (event.target.files && event.target.files[0]) {
            this.uploading = true;
            var reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]); // read file as data url
            reader.onload = function (event) {
                _this.url = event.target.result;
                _this.uploading = false;
            };
        }
    };
    UserProfileComponent = __decorate([
        core_1.Component({
            selector: 'user-profile',
            templateUrl: './user-profile.component.html',
            styleUrls: ['.//user-profile.component.css']
        })
    ], UserProfileComponent);
    return UserProfileComponent;
}());
exports.UserProfileComponent = UserProfileComponent;
//# sourceMappingURL=user-profile.component.js.map