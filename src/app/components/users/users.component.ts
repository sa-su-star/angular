import { ShareService } from './../../services/share.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  constructor(
    private api: ApiService,
    public dialog: MatDialog,
    private share: ShareService
  ) {}
  displayedColumns: string[] = [
    'user',
    'userName',
    'email',
    'address',
    'phone',
    'company',
    'job',
    'action',
  ];

  dataSource = this.share.dataSource;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.console();
    this.getAllUsers();
  }
  //Get Users
  getAllUsers() {
    this.api.getUser().subscribe({
      next: (data: any) => {
        this.dataSource = new MatTableDataSource(data);

        console.log(data);
        // console.log(this.dataSource.filteredData);
      },
      error: (err) => {
        console.log(err.message);
      },
    });
  }
  console() {
    console.log(this.dataSource);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  editUser(user: any) {
    this.dialog.open(DialogComponent, {
      width: '50%',
      data: user,
    });
  }
  deleteUser(id: number) {
    this.api.deleteUser(id).subscribe({
      next: (res) => {
        alert('user Deleted Successfully');
        this.getAllUsers();
      },
      error: (err) => {
        alert(err.message);
      },
    });
  }
}
