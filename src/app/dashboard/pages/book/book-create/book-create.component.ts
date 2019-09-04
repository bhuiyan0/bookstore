import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BookViewModel, BookEditModel } from 'src/app/model/book';
import { BookService } from 'src/app/services/book.service';
import { ActivatedRoute, Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.css']
})
export class BookCreateComponent implements OnInit {

  allCategory: {};
  allAuthor: {};
  allPublisher: {};

  idForUpdate: number = null;
  idForSoftDelete: number = null;

  errorMessages: any[];
  bookForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private bookService: BookService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.createForm();
    document.getElementById('quantity').style.display = 'block';
    this.loadDropDowns();
    this.route.paramMap.subscribe(params => {
      const bookId = +params.get('id');
      if (bookId) {
        this.getBook(bookId);
      }
    });
  }

  createForm() {
    this.bookForm = this.formBuilder.group({
      bookName: ['', [Validators.required]],
      categoryId: ['', [Validators.required]],
      authorId: ['', [Validators.required]],
      publisherId: ['', [Validators.required]],
      descriptions: [''],
      costPrice: ['', [Validators.required, Validators.min(1)]],
      sellingPrice: ['', [Validators.required, Validators.min(1)]],
      edition: ['', [Validators.required]],
      isbn: ['', [Validators.required, Validators.min(1)]],
    //  translatorId: [''],
      numberOfPage: ['', [Validators.required, Validators.min(1)]],
      language: [''],
      imageUrl: [''],
      quantity: ['', [Validators.required, Validators.min(1)]],
      reorderLevel: ['', [Validators.required, Validators.min(1)]]
    });
  }

  submit() {
    if (this.idForUpdate == null) {
      this.bookService.create(this.bookForm.value).subscribe(res => {
        console.log(res);
        this.bookForm.reset();
        this.router.navigate(['/dashboard/book'])

      }, error => {
        console.log(error);
      });
    } else {
      this.bookService.update(this.idForUpdate, this.bookForm.value).subscribe(res => {
        console.log(res);
        this.router.navigate(['/dashboard/book']);
      }, error => {

        this.errorMessages.push(error);
        console.log(error);
      });
    }

  }

  loadDropDowns() {
    this.bookService.getCategory().subscribe(res => {
      this.allCategory = res;
    });
    this.bookService.getAutor().subscribe(res => {
      this.allAuthor = res;
    });
    this.bookService.getPublisher().subscribe(res => {
      this.allPublisher = res;
    });
  }

  getBook(id: number) {
    this.bookService.getById(id)
      .subscribe(
        (book: BookViewModel) => {
          this.editBook(book),
            this.idForUpdate = id;
          console.log(this.idForUpdate);
        },
        (err: any) => console.log(err)
      );
  }

  editBook(book: BookEditModel) {
    this.bookForm.patchValue({
      bookName: book.bookName,
      categoryId: book.categoryId,
      authorId: book.authorId,
      publisherId: book.publisherId,
      descriptions: book.descriptions,
      costPrice: book.costPrice,
      sellingPrice: book.sellingPrice,
      edition: book.edition,
      isbn: book.isbn,
     // translatorId: book.translatorId,
      numberOfPage: book.numberOfPage,
      language: book.language,
      // imageUrl: book.imageUrl,
      reorderLevel: book.reorderLevel
    });

    document.getElementById('quantity').style.display = 'none';
  }
}
