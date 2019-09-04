import { Component, OnInit, ViewChild, NgModule, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Author } from 'src/app/model/author';
import { AuthorService } from 'src/app/services/author.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
declare var $: any;


@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {

  eventLog = '';
  authors: Observable<Author[]>;
  key = 'authorName';
  reverse = false;
  p = 1;
  row = 5;
  search: any;

  idForUpdate = null;
  idForDelete = null;
  authorForm: FormGroup;
  title: string;

  constructor(private authorService: AuthorService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loadAuthors();
    this.createForm();
  }

  createForm() {
    // tslint:disable-next-line:max-line-length
    const emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const phonePattern: RegExp = /^(01[1-9](\d{8})$)/;
    this.authorForm = this.formBuilder.group({
      authorName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      dob: [''],

      contactNo: ['', [Validators.required, Validators.pattern(phonePattern)]],
      email: [null, [Validators.required, Validators.pattern(emailregex)]],
      address: ['', [Validators.required, Validators.maxLength(200)]],
      authorInfo: ['', [Validators.required]],
      imageUrl: ['']
    });
  }


  viewData(id: any) {
    this.authorService.getById(id).subscribe(res => {
      document.getElementById('authorname').innerHTML = res['authorName'];
      document.getElementById('authoremail').innerHTML = res['email'];
      document.getElementById('authorcontact').innerHTML = res['contactNo'];
      document.getElementById('authoraddress').innerHTML = res['address'];
      $('#authorViewModal').modal('show');

    });
  }

  createStart() {
    this.authorForm.reset();
    this.title = 'Add new author';
    document.getElementById('btnSubmit').style.display = 'block';
    document.getElementById('btnSubmit').innerHTML = 'Save';
    $('#authorModal').modal('show');
    // this.submitted = false;
  }


  submit() {
    if (this.authorForm.invalid) {
      return;
    }
    if (this.idForUpdate == null) {
      this.authorService.create(this.authorForm.value).subscribe(res => {
        this.loadAuthors();
        $('#authorModal').modal('hide');
        this.authorForm.reset();
      });
    } else {
      this.authorService.update(this.idForUpdate, this.authorForm.value).subscribe(res => {
        this.loadAuthors();
        this.idForUpdate = null;
        $('#authorModal').modal('hide');
        this.authorForm.reset();
      });
    }

  }

  udpateStart(id: any) {
    this.authorService.getById(id).subscribe(res => {
      this.authorForm.controls.authorName.setValue(res.authorName);
      this.authorForm.controls.email.setValue(res.email);
      this.authorForm.controls.contactNo.setValue(res.contactNo);
      this.authorForm.controls.dob.setValue(res.doB);
      this.authorForm.controls.address.setValue(res.address);
      this.authorForm.controls.authorInfo.setValue(res.authorInfo);
      this.idForUpdate = id;
      this.title = 'Update author information';
      document.getElementById('btnSubmit').innerHTML = 'Update';
      document.getElementById('btnSubmit').style.display = 'block';
      $('#authorModal').modal('show');
    });
  }

  deleteStart(id: any) {
    this.idForDelete = id;
    $('#confirm-delete').modal('show');
  }

  sDeleteConfirm() {
    if (this.idForDelete != null) {
      this.authorService.softDelete(this.idForDelete).subscribe(res => {
        this.loadActiveAuthors();
        $('#confirm-delete').modal('hide');
        console.log(res);
        this.idForDelete = null;
        this.authorForm.reset();
      });
    }
  }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  loadAuthors() {
    this.authors = this.authorService.getAllAuthors();
  }

  loadActiveAuthors() {
    this.authors = this.authorService.getActiveAuthors();
  }


  openModal() {
    $('#authorModal').modal('show');
  }
  closeModal() {
    this.authorForm.reset();
    $('#authorModal').modal('hide');
  }

  openViewModal() {
    $('#authorViewModal').modal('show');
  }
  closeViewModal() {
    $('#authorViewModal').modal('hide');
  }

  // for email validation
  getErrorEmail() {
    return this.authorForm.get('email').hasError('required') ? 'Field is required' :
      this.authorForm.get('email').hasError('pattern') ? 'Not a valid email address' : '';
  }
}
