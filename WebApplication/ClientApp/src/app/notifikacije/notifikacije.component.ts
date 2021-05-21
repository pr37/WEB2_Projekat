import { Component } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { BackendServiceService } from '../backend-service.service';
import { HttpClient, HttpHeaders, HttpClientJsonpModule } from '@angular/common/http';
import { Notification, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Component({
  selector: 'notifikacije',
  templateUrl: './notifikacije.component.html',
  styleUrls: ['./notifikacije.component.css'],
  providers: [BackendServiceService]
})

export class NotifikacijeComponent {
  allNotifications: Array<{ id: string, text: string, color: string, icon: string, timestamp: string, tied: boolean, tiedTo: string, read: boolean }>;
  unreadNotifications: Array<{ id:string,text: string, color: string, icon: string, timestamp: string, tied: boolean, tiedTo: string }>;
  tempNotifications: Array<{ id: string, text: string, color: string, icon: string, timestamp: string, tied: boolean, tiedTo: string }>;

  private heroesUrl = 'api/Notifications';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  testnotif: Observable<Object>;
  got_notifs: any;
  constructor(private http: HttpClient,
    private backendService: BackendServiceService) {
    //TODO get all notifications and filter into unreadNotifications
    this.unreadNotifications = new Array();
    this.tempNotifications = new Array();
    this.allNotifications = new Array();
    this.getNotifications("2").subscribe(
      (res: any) => {
        console.log("ffffffff");
        console.log(res);
        res.forEach(not => this.allNotifications.push({ id: not.notifikacijaID, text: not.text, color: not.color, icon: not.icon, timestamp: not.timeStamp, tied: not.tied, tiedTo: not.tiedTo, read: not.read }));
      },
      err => {
        console.log("Err: " + err);
        alert(err);
      }
    )
    this.getUnreadNotifications("2").subscribe(
      (res: any) => {
        console.log("Got unread notifications");
        console.log(res);
        res.forEach(not => this.unreadNotifications.push({ id: not.notifikacijaID, text: not.text, color: not.color, icon: not.icon, timestamp: not.timeStamp, tied: not.tied, tiedTo: not.tiedTo }));
        res.forEach(not => this.tempNotifications.push({ id: not.notifikacijaID, text: not.text, color: not.color, icon: not.icon, timestamp: not.timeStamp, tied: not.tied, tiedTo: not.tiedTo }));
      },
      err => {
        console.log("Err: " + err);
        alert(err);
      }
    )
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
    this.unreadNotifications.forEach(val => this.tempNotifications.push((<any>Object).assign({}, val)));
  }

  getNotifications(id: string)  {
    return this.http.get('https://localhost:44301/Notifikacije/'  + id);
  }

  getUnreadNotifications(id: string) {
    return this.http.get('https://localhost:44301/Notifikacije/unread/' + id);
  }

  sendReadNotif(notifId: string) {
    return this.http.put('https://localhost:44301/Notifikacije/read/' + notifId, notifId);
  }

  markAllRead(): void {
    this.unreadNotifications.forEach(val => this.sendReadNotif(val.id).subscribe(
      (res: any) => {
        console.log("Sent read");
        console.log(res);
      },
      err => {
        console.log("Err: " + err);
        alert(err);
      }
    ))
    this.unreadNotifications = new Array();
    this.tempNotifications = new Array();
  }

  markRead(id): void {
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
    this.sendReadNotif(id).subscribe(
      (res: any) => {
        console.log("Sent read");
        console.log(res);
       },
      err => {
        console.log("Err: " + err);
        alert(err);
      }
    )
  }

  routeTo(tiedTo): void {
    //TODO 
  }

  showAll(): void {
    this.unreadNotifications = new Array();
    this.getNotifications("2").subscribe(
      (res: any) => {
        console.log("Got all notifications");
        console.log(res);
        res.forEach(not => this.unreadNotifications.push({ id: not.notifikacijaID, text: not.text, color: not.color, icon: not.icon, timestamp: not.timeStamp, tied: not.tied, tiedTo: not.tiedTo }));
      },
      err => {
        console.log("Err: " + err);
        alert(err);
      }
    )
  }

  showUnread(): void {
    this.unreadNotifications = new Array();
    
    this.getUnreadNotifications("2").subscribe(
      (res: any) => {
        console.log("Got unread notifications");
        console.log(res);
        res.forEach(not => this.unreadNotifications.push({ id: not.notifikacijaID, text: not.text, color: not.color, icon: not.icon, timestamp: not.timeStamp, tied: not.tied, tiedTo: not.tiedTo }));
        res.forEach(not => this.tempNotifications.push({ id: not.notifikacijaID, text: not.text, color: not.color, icon: not.icon, timestamp: not.timeStamp, tied: not.tied, tiedTo: not.tiedTo }));
      },
      err => {
        console.log("Err: " + err);
        alert(err);
      }
    )
   // this.tempNotifications.forEach(val => this.unreadNotifications.push((<any>Object).assign({}, val)));
  }

  showError(): void {
    this.unreadNotifications = new Array();
    let result = this.tempNotifications.filter(o => o.icon === 'error');
    result.map(val => this.unreadNotifications.push((<any>Object).assign({}, val)));
  }

  showInfo(): void {
    this.unreadNotifications = new Array();
    let result = this.tempNotifications.filter(o => o.icon === 'notification_important');
    result.map(val => this.unreadNotifications.push((<any>Object).assign({}, val)));
  }

  showSuccess(): void {
    this.unreadNotifications = new Array();
    let result = this.tempNotifications.filter(o => o.icon === 'done_all');
    result.map(val => this.unreadNotifications.push((<any>Object).assign({}, val)));
  }

  showWarning(): void {
    this.unreadNotifications = new Array();
    let result = this.tempNotifications.filter(o => o.icon === 'warning');
    result.map(val => this.unreadNotifications.push((<any>Object).assign({}, val)));
  }
}

export interface Notifikacija {
  notifikacijaID: string,
  forUserID: string,
  text: string,
  color: string,
  icon: string,
  timeStamp: Date,
  tied: boolean,
  tiedTo: string,
  read: boolean
}
