import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Category } from 'src/app/model/category';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  search: any;

  categories: Observable<Category[]>;
  constructor(private categoryService: CategoryService, private router: Router) { }

  ngOnInit() {
    this.loadAllAuthor();
  }
  loadAllAuthor() {
    this.categories = this.categoryService.getAllActive()
  }

  categoryDetails(id: any) {
    this.router.navigate(['/store/categoryBook', id])
  }

}
