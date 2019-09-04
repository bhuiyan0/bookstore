import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Book, BookViewModel } from 'src/app/model/book';
import { BookService } from 'src/app/services/book.service';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  public searchText: string; // for custom filter

  books: Observable<BookViewModel[]>;
  key = 'bookName';
  reverse = false;
  p = 1;
  row = 5;
  constructor(private bookService: BookService, private router: Router) { }

  ngOnInit() {
    this.load();
  }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  load() {
    this.books = this.bookService.getAllBooks();
  }

  updateStart(id: number) {
    this.router.navigate(['/dashboard/edit-book', id]);
  }

  openViewModal() {
    $('#bookViewModal').modal('show');
  }
  closeViewModal() {
    $('#bookViewModal').modal('hide');
  }

  viewData(id: number) {
    this.bookService.getById(id).subscribe(data => {
      document.getElementById('bookName').innerHTML = data.bookName;
      document.getElementById('authorName').innerHTML = data.authorName;
      document.getElementById('publisherName').innerHTML = data.publisherName;
      document.getElementById('edition').innerHTML = data.edition;
      document.getElementById('isbn').innerHTML = data.isbn;
      document.getElementById('numberOfPage').innerHTML = data.numberOfPage.toString();
      document.getElementById('language').innerHTML = data.language;
      document.getElementById('costPrice').innerHTML = data.costPrice.toString();
      document.getElementById('sellingPrice').innerHTML = data.sellingPrice.toString();
      document.getElementById('authorName').innerHTML = data.authorName;
      document.getElementById('categoryName').innerHTML = data.categoryName;
      document.getElementById('stock').innerHTML = data.quantity.toString();
      $('#bookViewModal').modal('show');
    });
  }
}
