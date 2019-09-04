import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import { RoleService } from 'src/app/services/role.service';
declare var $: any;
@Component({
  // selector: 'app-author',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: Observable<User[]>;
  key = 'firstName';
  reverse = false;
  p = 1;
  row = 5;

  search: any;
  userForm: FormGroup;
  id: any = null;
  idForUpdate = null;
  idForDelete = null;

  allRoles: {};
  constructor(private userService: UserService, private router: Router, private roleService: RoleService) { }

  ngOnInit() {
    this.loadUser();
    this.createForm();
    this.loadDropDowns();
  }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  loadUser() {
    this.users = this.userService.getAllUsers();
  }
  createForm() {
    this.userForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern('[a-zA-Z]')
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      role: new FormControl(),

      // cb:new FormControl('',Validators.requiredTrue)
    });
  }



  submit() {
    this.userService.create(this.userForm.value).subscribe(res => {
      this.loadUser();
      $('#userModal').modal('hide');
      this.userForm.reset();
    });
  }

  deleteStart(id: any) {
    this.idForDelete = id;
    $('#confirm-delete').modal('show');
  }


  loadDropDowns() {
    this.roleService.getAllRoles().subscribe(res => {
      this.allRoles = res;
    });
  }

  DeleteConfirm() {
    if (this.idForDelete != null) {
      this.userService.delete(this.idForDelete).subscribe(res => {
        this.loadUser();
        $('#confirm-delete').modal('hide');
        this.idForDelete = null;
        this.userForm.reset();
      });
    }
  }


  closeModal() {
    $('#userModal').modal('hide');
  }

  closeViewModal() {
    $('#userViewModal').modal('hide');
  }


  viewData(id: any) {
    this.userService.getById(id).subscribe(res => {
      document.getElementById('fullName').innerHTML = `${res.firstName} ${res.lastName}`;
      document.getElementById('userName').innerHTML = res.userName;
      document.getElementById('email').innerHTML = res.email;
      document.getElementById('phoneNumber').innerHTML = res.phoneNumber;
      document.getElementById('address').innerHTML = res.address;
      document.getElementById('role').innerHTML = res.role;
      $('#userViewModal').modal('show');
    });
  }


  createStart() {
    this.userForm.reset();
    $('#userModal').modal('show');
  }
}
