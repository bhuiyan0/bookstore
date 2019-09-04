import { Component, OnInit } from '@angular/core';
import { AuthorService } from 'src/app/services/author.service';
import { Router } from '@angular/router';
import { Author } from 'src/app/model/author';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css']
})
export class AuthorListComponent implements OnInit {
  search: any;
  authors: Observable<Author[]>;
  constructor(private authorService: AuthorService, private router: Router) { }

  ngOnInit() {
    this.loadAllAuthor();
  }

  loadAllAuthor() {
    this.authors = this.authorService.getActiveAuthors()
  }

  authorDetails(id: any) {
    this.router.navigate(['/store/authorBook', id])
  }

}
