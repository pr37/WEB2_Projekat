import { Component } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'notifikacije',
  templateUrl: './notifikacije.component.html',
  styleUrls: ['./notifikacije.component.css']
})

export class NotifikacijeComponent {
  unreadNotifications: Array<{ id:string,text: string, color: string, icon: string, timestamp: string, tied: boolean, tiedTo: string }>;
  tempNotifications: Array<{ id:string,text: string, color: string, icon: string, timestamp: string, tied: boolean, tiedTo: string }>;

  constructor() {
    //TODO get all notifications and filter into unreadNotifications
    this.unreadNotifications = new Array();
    this.tempNotifications = new Array();
    this.unreadNotifications.push({ id:'1',text: 'testtttttt', color: 'red', icon: 'error', timestamp: '21.10.1998.', tied:false,tiedTo:'' })
    this.unreadNotifications.push({ id:'2',text: 'testtttttt', color: 'red', icon: 'error', timestamp: '21.10.1998.', tied:false,tiedTo:'' })
    this.unreadNotifications.push({ id: '3',text: 'testtttttt', color: 'blue', icon: 'notification_important', timestamp: '21.10.1998.', tied:true,tiedTo:'smth' })
    this.unreadNotifications.push({ id: '4',text: 'testtttttt', color: 'blue', icon: 'notification_important', timestamp: '21.10.1998.', tied:true,tiedTo:'smth' })
    this.unreadNotifications.push({ id: '5',text: 'testtttttt', color: 'yellow', icon: 'warning', timestamp: '21.10.1998.', tied:true,tiedTo:'smth' })
    this.unreadNotifications.push({ id: '6',text: 'testtttttt', color: 'yellow', icon: 'warning', timestamp: '21.10.1998.', tied:true,tiedTo:'smth' })
    this.unreadNotifications.push({ id: '7', text: 'testtttttt', color: 'green', icon: 'done_all', timestamp: '21.10.1998.', tied: true, tiedTo: 'smth' })
    this.unreadNotifications.push({ id: '8', text: 'testtttttt', color: 'green', icon: 'done_all', timestamp: '21.10.1998.', tied: true, tiedTo: 'smth' })
    this.unreadNotifications.push({ id: '9', text: 'testtttttt', color: 'green', icon: 'done_all', timestamp: '21.10.1998.', tied: true, tiedTo: 'smth' })
    this.unreadNotifications.forEach(val => this.tempNotifications.push((<any>Object).assign({}, val)));
  }

  markAllRead(): void {
    this.unreadNotifications = new Array();
    this.tempNotifications = new Array();
    //TODO update db
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
  }

  routeTo(tiedTo): void {
    //TODO 
  }

  showAll(): void {

  }

  showUnread(): void {
    this.unreadNotifications = new Array();
    this.tempNotifications.forEach(val => this.unreadNotifications.push((<any>Object).assign({}, val)));
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
