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
  displayedColumns: string[] = ['ID', 'StartDate', 'PhoneNo', 'Status', 'Address'];
  dataSource = new MatTableDataSource<PlanRadaTabela>(ELEMENT_DATA);

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
}

const ELEMENT_DATA: PlanRadaTabela[] = [
  { ID: '231', StartDate: '24.4.2021.', PhoneNo: '012434234', Status: 'OK', Address: 'Maje Gojkovic 123' },
  { ID: '123', StartDate: '26.4.2021.', PhoneNo: '012434354', Status: 'DRAFT', Address: 'Aleka Vucica 321' },
  { ID: '1aw3', StartDate: '26.4.2021.', PhoneNo: '012434354', Status: 'DRAFT', Address: 'Aleka Vucica 321' },
  { ID: '1aw3', StartDate: '26.4.2021.', PhoneNo: '012434354', Status: 'DRAFT', Address: 'Aleka Vucica 321' },
  { ID: '1aw3', StartDate: '26.4.2021.', PhoneNo: '012434354', Status: 'DRAFT', Address: 'Aleka Vucica 321' },
  ]
