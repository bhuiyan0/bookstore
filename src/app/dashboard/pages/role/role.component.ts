import { Component, OnInit, Input } from '@angular/core';
import { LoadJsService } from 'src/app/services/load-js.service';
import { Role } from 'src/app/model/role';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { RoleService } from 'src/app/services/role.service';
declare var $: any;
@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css'
  ]
})
export class RoleComponent implements OnInit {

  key = 'categoryName';
  reverse = false;
  p = 1;
  row = 5;
  search: any;

  archive = true;
  allRoles: Observable<Role[]>;
  submitted = false;
  idForUpdate = null;
  idForDelete = null;
  empty: boolean;
  roleForm: FormGroup;


  constructor(private roleService: RoleService, private formBuilder: FormBuilder) { }

  @Input() role: Role[];

  ngOnInit() {
    this.createForm();
    this.loadAll();
  }
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  createForm() {
    this.roleForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  get roles() {
    return this.roleForm.controls;
  }

  loadAll() {
    this.allRoles = this.roleService.getAllRoles();
  }

  submit() {
    this.roleService.create(this.roleForm.value).subscribe(res => {
      this.loadAll();
    });
  }
  deleteStart(id: any) {
    this.idForDelete = id;
    $('#confirm-delete').modal('show');
  }

  DeleteConfirm() {
    if (this.idForDelete != null) {
      this.roleService.delete(this.idForDelete).subscribe(res => {
        this.loadAll();
        $('#confirm-delete').modal('hide');
        this.idForDelete = null;
        this.roleForm.reset();
      });
    }
  }

  openModal() {
    $('#roleModal').modal('show');
  }
  closeModal() {
    $('#roleModal').modal('hide');
  }
}
