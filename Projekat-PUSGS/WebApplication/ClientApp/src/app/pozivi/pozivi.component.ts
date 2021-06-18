import { Component } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import {  OnInit, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { HttpClient, HttpHeaders, HttpClientJsonpModule } from '@angular/common/http';
import { Notification, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Component({
  selector: 'pozivi',
  templateUrl: './pozivi.component.html',
  styleUrls: ['./pozivi.component.css']
})

export class PoziviComponent {
  currentLat: number;
  currentLon: number;
  currentStreet: string;
  userLoggedIn: boolean;
  imePrezime: string;
  Problem: string;
  Adresa: string;
  ImePrezimeUser: string;
  AdresaUser: string;
  userId: string;
  Pozivi: Array<{ lat: number, lon: number , problem: string}>;
  role: string;
  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone, private http: HttpClient) {
    this.userLoggedIn = this.isLoggedIn();
    if (this.userLoggedIn) {
      //TODO get pozivvi
      this.Pozivi = new Array();
    }
    this.getUser(this.userId).subscribe(
      (res: any) => {
        console.log(res);
        this.ImePrezimeUser = res[0].ime +' ' +res[0].prezime;
        this.AdresaUser = res[0].address;
        this.role = res[0].role;
      },
      err => {
        console.log("Err: " + err);
        alert('Could not get user.');
      }
    )
    if (this.role == 'admin') {
      this.getAllPozivi().subscribe(
        (res: any) => {
          console.log(res);
          this.Pozivi.splice(0, this.Pozivi.length);
          res.forEach(p => this.Pozivi.push({ lat: p.latitude, lon: p.longitude, problem: p.problem }));
          console.log(this.Pozivi);
        },
        err => {
          console.log("Err: " + err);
          alert('Could not get pozivi.');
        }
      )
    } else if (this.userLoggedIn) {
      this.getPoziviUser().subscribe(
        (res: any) => {
          console.log(res);
          this.Pozivi.splice(0, this.Pozivi.length);
          res.forEach(p => this.Pozivi.push({ lat: p.latitude, lon: p.longitude, problem: p.problem }));
          console.log(this.Pozivi);
        },
        err => {
          console.log("Err: " + err);
          alert('Could not get users pozivi.');
        }
      )
    }

  }
  isLoggedIn() {
    if (localStorage.getItem('currentUser')) {
      console.log('user is logged in');
      this.userId = localStorage.getItem('currentUser');
      return true;
    }
    console.log('user is not logged in');
    return false;
  }

  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;
  icon: {
    url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
    scaledSize: {
      width: 40,
      height: 60
    }
  }

  onMouseOver(infoWindow, gm) {

    if (gm.lastOpen != null) {
      gm.lastOpen.close();
    }

    gm.lastOpen = infoWindow;

    infoWindow.open();
  }

  addCall():void {
    if (!this.userLoggedIn) {
      
    } else {
      this.Adresa = this.AdresaUser;
      this.longitude = this.currentLon;
      this.latitude = this.currentLat;
      this.postPoziv().subscribe(
        (res: any) => {
          console.log(res);
          alert('Poziv sent.');
        },
        err => {
          console.log("Err: " + err);
          alert('Could not post poziv.');
        }
      )
    }
    this.ngOnInit();
  }

  addCallAonimously(): void {
    this.Pozivi.push({ lat: this.latitude, lon: this.longitude, problem: this.Problem });


      this.postPoziv().subscribe(
        (res: any) => {
          console.log(res);
          alert('Poziv sent.');
        },
        err => {
          console.log("Err: " + err);
          alert('Could not post poziv.');
        }
      )
    
  }

  ngOnInit() {
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
         
          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;

          var components = place.address_components;
          var street = null;
          for (var i = 0, component; component = components[i]; i++) {
            console.log(component);
            if (component.types[0] == 'route') {
              street = component['long_name'];
            }
          }
          this.Adresa = street;
          alert(street);
         
        });
      });
    });
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }

  getUser(id: string) {
    return this.http.get('https://localhost:44301/Podesavanja/user/' + id);
  }

  getPoziviUser() {
    return this.http.get('https://localhost:44301/Pozivi/get/' + this.userId);
  }

  getAllPozivi() {
    return this.http.get('https://localhost:44301/Pozivi/getall' );
  }

  postPoziv() {
    //add/{userid}/{problem}/{adresa}/{longitude}/{latitude}
    return this.http.post('https://localhost:44301/Pozivi/add/' +  this.userId + '/' + this.Problem + '/' + this.Adresa + '/' + this.longitude.toString() + '/' + this.latitude.toString(),null);
  }

  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.currentLat = position.coords.latitude;
        this.currentLon = position.coords.longitude;
        this.zoom = 15;
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;
      });
    }
    
  }
}
