import { Component, ViewChild, AfterViewInit, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
export interface UserInterface {
  id: number;
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  status: boolean;
}

const ELEMENT_DATA: UserInterface [] = [
  {id: 1, userName: 'crholgin', email: 'crholgin@g.com', firstName: "Cristian", lastName: 'Holgin', status: true},
  {id: 2, userName: 'acaicedo', email: 'acaicedo@g.com', firstName: "Andy", lastName: 'Caicedo', status: true},
  {id: 3, userName: 'jdope', email: 'jdoep@g.com', firstName: "John", lastName: 'Dope', status: true},
  {id: 4, userName: 'cmlino', email: 'cmlino@g.com', firstName: "Camila", lastName: 'Lino', status: true},
  {id: 5, userName: 'fbcastro', email: 'fbcastro@g.com', firstName: "Fabian", lastName: 'Castro', status: true},
  {id: 6, userName: 'jarcila', email: 'jarcila@g.com', firstName: "Jazmin", lastName: 'Arcila', status: true},
  {id: 7, userName: 'crholgin', email: 'crholgin@g.com', firstName: "Cristian", lastName: 'Holgin', status: true},
  {id: 8, userName: 'crholgin', email: 'crholgin@g.com', firstName: "Cristian", lastName: 'Holgin', status: true},
  {id: 9, userName: 'crholgin', email: 'crholgin@g.com', firstName: "Cristian", lastName: 'Holgin', status: true},
  {id: 10, userName: 'crholgin', email: 'crholgin@g.com', firstName: "Cristian", lastName: 'Holgin', status: true},
];
@Component({
  selector: 'table-component',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements AfterViewInit {
  title = 'ito-test';
  FormUser: FormGroup;
  user = {};
  type = '';
  showModal = false;
  displayedColumns: string[] = ['userName', 'email', 'firstName', 'lastName', 'status', 'actions'];
  Users = new MatTableDataSource<UserInterface>(ELEMENT_DATA);
  
  constructor(public dialog: MatDialog,
    private formBuilder: FormBuilder){
      this.FormUser = this.formBuilder.group({
        id: [0],
        firstName: ['', [Validators.required, Validators.maxLength(100)]],
        lastName: ['', [Validators.required, Validators.maxLength(100)]],
        userName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        status: ['', [Validators.required]],
      })
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.Users.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.Users.filter = filterValue.trim().toLowerCase();

    if (this.Users.paginator) {
      this.Users.paginator.firstPage();
    }
  }

  onSubmit() {
    if (!this.FormUser.invalid) {
      if (this.type === 'create') {
        this.FormUser.controls.id.setValue(ELEMENT_DATA[ELEMENT_DATA.length - 1].id + 1);
        ELEMENT_DATA.push(this.FormUser.value);
        this.Users = new MatTableDataSource<UserInterface>(ELEMENT_DATA);
        this.Users.paginator = this.paginator;
        this.showModal = false;
      } if (this.type === 'update') {
        for (let i = 0; i < this.Users.data.length; i++) {
          const u = this.Users.data[i];
          if (u.id == this.FormUser.controls.id.value) {
            u.firstName = this.FormUser.controls.firstName.value
            u.lastName = this.FormUser.controls.lastName.value
            u.email = this.FormUser.controls.email.value
            u.userName = this.FormUser.controls.userName.value
            u.status = this.FormUser.controls.status.value
          }
        }
        this.showModal = false;
      }
    }
  }

  openModal(type: string, user:any = null){
    this.type = type;
    switch (type) {
      case 'create':
        this.showModal = true;
        break;
      case 'update':
        this.showModal = true;
        this.FormUser.setValue(user);
        console.log(this.FormUser);
        
        break;
    
      case 'show':
        this.showModal = true;
        this.FormUser.setValue(user);
        this.FormUser.disable();
        break;
    
      default:
        this.showModal = false;
        this.FormUser.reset();

        break;
    }
  }
}