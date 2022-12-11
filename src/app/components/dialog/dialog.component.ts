import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  companies = ['Talpat', 'Shgardi', 'Marsoul'];
  jobs = ['Courier', 'Customer', 'Partner'];
  users: any = [];
  userForm!: FormGroup;
  actionBtn: string = 'Save';
  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogComponent>
  ) {}

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      company: ['', Validators.required],
      job: ['', Validators.required],
    });
    this.pushData();
  }
  //add New User
  createUser() {
    if (!this.editData) {
      if (this.userForm.valid) {
        this.api.postUser(this.userForm.value).subscribe({
          next: (res) => {
            alert('new user added Successfully');
            this.userForm.reset();
            this.dialogRef.close('save');
          },
          error: (err) => {
            alert(err.message);
          },
        });
      } else {
        alert('Fill rest of  form ');
      }
    } else {
      this.updateUser();
    }
  }

  //Update User
  updateUser() {
    this.api.putUser(this.userForm.value, this.editData.id).subscribe({
      next: (red) => {
        alert('user has been updated');
        this.userForm.reset();
        this.dialogRef.close('update');
      },
      error: (err) => {
        alert('Something Wrong');
      },
    });
  }

  // Push Data When open Dialog
  pushData() {
    if (this.editData) {
      this.actionBtn = 'Update';
      this.userForm.controls['name'].setValue(this.editData.name);
      this.userForm.controls['userName'].setValue(this.editData.userName);
      this.userForm.controls['email'].setValue(this.editData.email);
      this.userForm.controls['address'].setValue(this.editData.address);
      this.userForm.controls['phone'].setValue(this.editData.phone);
      this.userForm.controls['company'].setValue(this.editData.company);
      this.userForm.controls['job'].setValue(this.editData.job);
    }
  }
}
