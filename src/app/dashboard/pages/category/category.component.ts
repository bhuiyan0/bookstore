import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';


import { Category } from '../../../model/category';
import { CategoryService } from 'src/app/services/category.service';
import { ActivatedRoute } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  allCategory: Observable<Category[]>;
  key = 'categoryName';
  reverse = false;
  p = 1;
  row = 5;

  archive = true;
  submitted = false;
  idForUpdate = null;
  idForDelete = null;
  empty: boolean;
  categoryForm: FormGroup;
  error: string;
  formTitle: string;

  constructor(private catService: CategoryService, private formBuilder: FormBuilder, private _route: ActivatedRoute) { }

  @Input() category: Category[];

  ngOnInit() {
    this.createForm();
    this.loadActive();
  }

  createForm() {
    this.categoryForm = this.formBuilder.group({
      categoryName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]]
    });
  }

  get cat() {
    return this.categoryForm.controls;
  }
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  loadAll() {
    /// this.allCategory = this.catService.getAllCategory();
  }
  loadActive() {
    // const resolvedData:Observable<any[]>= this._route.snapshot.data['categoryList'];
    // if (Array.isArray(resolvedData)) {
    //   this.allCategory = resolvedData;
    // } else {
    //  console.log(resolvedData);
    // }

    this.allCategory = this.catService.getAllActive();
    this.archive = true;
  }
  loadInactive() {
    this.allCategory = this.catService.getAllInactive();
    this.archive = !this.archive;
  }

  getById(id: any) {
    this.catService.getCategory(id).subscribe(res => {
    });
  }

  createStart() {
    this.categoryForm.reset();
    this.formTitle = 'Create a category';
    document.getElementById('btnSubmit').style.display = 'block';
    document.getElementById('btnSubmit').innerHTML = 'Save';
    $('#categoryModal').modal('show');
    // this.submitted = false;
  }

  submit() {
    // this.submitted = true;
    if (this.categoryForm.invalid) {
      return;
    } else {
      if (this.idForUpdate == null) {
        this.catService.create(this.categoryForm.value).subscribe(res => {
          this.loadActive();
          $('#categoryModal').modal('hide');
          this.categoryForm.reset();
        });
      } else {
        this.catService.update(this.idForUpdate, this.categoryForm.value).subscribe(res => {
          this.loadActive();
          this.idForUpdate = null;
          $('#categoryModal').modal('hide');
          this.categoryForm.reset();
        });
      }
    }
  }

  deleteStart(id: any) {
    this.idForDelete = id;
    $('#confirm-delete').modal('show');
  }

  deleteConfirm() {
    if (this.idForDelete != null) {
      this.catService.delete(this.idForDelete).subscribe(res => {
        this.loadActive();
        $('#confirm-delete').modal('hide');
        console.log(res);
        this.idForDelete = null;
        this.categoryForm.reset();
      });
    }
  }
  sDeleteConfirm() {
    if (this.idForDelete != null) {
      this.catService.softDelete(this.idForDelete).subscribe(res => {
        this.loadActive();
        $('#confirm-delete').modal('hide');
        console.log(res);
        this.idForDelete = null;
        this.categoryForm.reset();
      });
    }
  }

  udpateStart(id: any) {
    this.catService.updateStart(id).subscribe(res => {
      this.formTitle = 'Update category';
      this.categoryForm.get('categoryName').setValue(res.categoryName);
      this.idForUpdate = id;
      document.getElementById('btnSubmit').innerHTML = 'Update';
      document.getElementById('btnSubmit').style.display = 'block';
      $('#categoryModal').modal('show');
    });
  }

  viewData(id: any) {
    this.catService.getCategory(id).subscribe(res => {
      document.getElementById('catName').innerHTML = res['categoryName'];
      $('#categoryViewModal').modal('show');
    });
  }

  closeModal() {
    this.categoryForm.reset();
    $('#categoryModal').modal('hide');
  }

  closeViewModal() {
    this.categoryForm.reset();
    $('#categoryViewModal').modal('hide');
  }

  mysubmit() {
    console.log(this.categoryForm.value);
  }
}
