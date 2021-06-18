import { Component } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientJsonpModule } from '@angular/common/http';
import { Notification, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { BackendServiceService } from '../backend-service.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;
  userLoggedIn = false;
  constructor(private http: HttpClient) {
    this.userLoggedIn = this.isLoggedIn();
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  login(username: string, password: string) {
    //return this.http.post<any>(`${this.serverUrl}api/login`, { username: username, password: password })
    //  .pipe(map(user => {
    //    if (user && user.token) {
    localStorage.setItem('currentUser', 'id1');         //JSON.stringify(user));
    this.userLoggedIn = true;
    //    }
    //  }),
   //     catchError(this.handleError)
    //  );
  }

  isLoggedIn() {
    if (localStorage.getItem('currentUser')) {
      console.log('user is logged in');
      return true;
    }
    console.log('user is not logged in');
    return false;
  }

  logout() {
    if (this.isLoggedIn()) {
      localStorage.removeItem('currentUser');
      console.log('user is logged out');
      this.userLoggedIn = false;
    }
  }
}
