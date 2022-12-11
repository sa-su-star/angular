import { Injectable, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class ShareService {
  constructor(private http: HttpClient) {}
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource!: MatTableDataSource<any>;

  // get user
  getUser() {
    return this.http.get('http://localhost:3000/newUser/');
  }

  getAllUsers() {
    this.getUser().subscribe({
      next: (data: any) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(data);
        console.log(this.dataSource.filteredData);
      },
      error: (err) => {
        console.log(err.message);
      },
    });
  }
}
