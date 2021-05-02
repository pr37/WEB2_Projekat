import { Component } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'planovi-rada',
  templateUrl: './planovi-rada.component.html',
  styleUrls: ['./planovi-rada.component.css']
})

export class PlanoviRadaComponent implements AfterViewInit{
  displayedColumns: string[] = ['ID', 'StartDate', 'PhoneNo', 'Status', 'Address', 'Company','Type'];
  dataSource = new MatTableDataSource<PlanRadaTabela>(ELEMENT_DATA);

  applySearch(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  selectedStatus: string;
  applyFilterStatus() {
    this.selectedStatus = this.selectedStatus.trim(); // Remove whitespace
    this.selectedStatus = this.selectedStatus.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = this.selectedStatus;
  }

  selectedType: string;
  applyFilterType() {
    this.selectedType = this.selectedType.trim(); // Remove whitespace
    this.selectedType = this.selectedType.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = this.selectedType;
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}

export interface PlanRadaTabela {
  ID: string;
  StartDate: string;
  PhoneNo: string;
  Status: string;
  Address: string;
  Company: string;
  Type: string;
}

const ELEMENT_DATA: PlanRadaTabela[] = [
  { ID: '231', StartDate: '24.4.2021.', PhoneNo: '012434234', Status: 'OK', Address: 'Maje Gojkovic 123', Company: 'ARRT' , Type: 'Planirani'},
  { ID: '123', StartDate: '26.4.2021.', PhoneNo: '012434354', Status: 'DRAFT', Address: 'Aleka Vucica 321', Company: 'A33', Type: 'Planirani'},
  { ID: '123', StartDate: '26.4.2021.', PhoneNo: '012434354', Status: 'DRAFT', Address: 'Aleka Vucica 321', Company: 'A33', Type: 'Neplaniran' },
  { ID: '123', StartDate: '26.4.2021.', PhoneNo: '012434354', Status: 'REPLACED', Address: 'Aleka Vucica 321', Company: 'A33', Type: 'Neplaniran' },
  ]
