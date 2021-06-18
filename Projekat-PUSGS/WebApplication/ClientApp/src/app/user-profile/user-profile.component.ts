import { Component } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { HttpClient, HttpHeaders, HttpClientJsonpModule } from '@angular/common/http';
import { Notification, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { BackendServiceService } from '../backend-service.service';
import { FormGroup, FormControlName } from '@angular/forms';
import { AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { HttpEventType } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['.//user-profile.component.css']
})

export class UserProfileComponent implements  OnInit{
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  Email: string;
  Username: string;
  Name: string;
  Lastname: string;
  DateBirth: Date;
  Address: string;
  Role: string;
  userImage: any;
  userLoggedIn: boolean;
  loggedInId: string;
  SendImage: boolean;
  isLoggedIn() {
    if (localStorage.getItem('currentUser')) {
      return true;
    }
    return false;
  }

  ngOnInit() {
    this.getUser(this.loggedInId).subscribe(
      (res: any) => {
        console.log(res);
         this.Email = res[0].email;
        this.Username = res[0].username;
        this.Name = res[0].ime;
        this.Lastname = res[0].prezime;
        this.DateBirth = res[0].dateOfBirth;
        this.Address = res[0].address;
        this.Role = res[0].role;
      },
      err => {
        console.log("Err: " + err);
        alert('Could not get user.');
      }
    )
 

    this.getImage(this.loggedInId)
      .subscribe((baseImage: any) => {
        //alert(JSON.stringify(baseImage));
        
        let aaa = JSON.stringify(baseImage);
        var re = aaa.slice(1, -1);
        let objectURL = 'data:image/jpg;base64,' + re;
        this.url = this.sanitizer.bypassSecurityTrustUrl(objectURL);

      });
  }

  fieldValidation(str): boolean {
   // console.log('t');
    if (str == 'username') {
      // console.log(this.Username);
      if (this.Username == '') {
        return true;
      }
    } else if (str == 'firstname') {
      if (this.Name == '') {
        return true;
      }
    } else if (str == 'lastname') {
      if (this.Lastname == '') {
        return true;
      }
    } else if (str == 'address') {
      if (this.Address == '') {
        return true;
      }
    }
    return false;
  }

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {
    this.SendImage = false;
    this.userLoggedIn = this.isLoggedIn();
    this.loggedInId = localStorage.getItem('currentUser');
    this.ngOnInit();
  }

  getUser(id: string) {
    return this.http.get('https://localhost:44301/Podesavanja/user/' + id);
  }

  getImage(id: string) {
    return this.http.get('https://localhost:44301/Podesavanja/image/' + id);
  }

  editUser() {
    var isimg;
    if (this.SendImage) {
      isimg = 'send';
    } else {
      isimg = 'not';
    }
    return this.http.post('https://localhost:44301/Podesavanja/edit/' + this.loggedInId + '/' + this.Username + '/' + this.Email + '/' + this.Name + '/' + this.Lastname + '/' + this.DateBirth.toString() + '/' + this.Address + '/' + this.Role  , this.fileImgFormData);
  }

  DisposeChanges() {
    this.ngOnInit();
  }

  Apply() {
    if (!this.fieldValidation('username') && !this.fieldValidation('firstname') && !this.fieldValidation('lastname') && !this.fieldValidation('address')) {
      this.editUser().subscribe(
        (res: any) => {
          console.log(res);
          alert('User profile updated.');
        },
        err => {
          console.log("Err: " + err.toString());
          alert('User with this username or email already exists.');
        }
      )
    } else {
      alert('Please fill all required fields.');
    }
  }
  
  fileImgFormData: any;
  url: any;
  public uploadFile = (files) => {
    this.uploading = true;
    if (files.length === 0) {
      return;
    }
    this.SendImage = true;
    let fileToUpload = <File>files[0];
    this.fileImgFormData = new FormData();
    this.fileImgFormData.append('file', fileToUpload, fileToUpload.name);

    var reader = new FileReader();

    reader.readAsDataURL(files[0]); // read file as data url

    reader.onload = (event) => { // called once readAsDataURL is completed
      this.url = event.target.result as string;
      this.uploading = false;
    }
  }
  matcher = new MyErrorStateMatcher();
  
  public uploading = false;
  onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      this.uploading = true;
      var reader = new FileReader();
      this.SendImage = true;
      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result as string;
        this.uploading = false;
      }
    }
  }
}


