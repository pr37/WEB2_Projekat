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
    function UserProfileComponent() {
        this.emailFormControl = new forms_1.FormControl('', [
            forms_1.Validators.required,
            forms_1.Validators.email,
        ]);
        this.matcher = new MyErrorStateMatcher();
        this.uploading = false;
    }
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