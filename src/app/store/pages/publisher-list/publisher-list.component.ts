import { Component, OnInit } from '@angular/core';
import { PublisherService } from 'src/app/services/publisher.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Publisher } from 'src/app/model/publisher';

@Component({
  selector: 'app-publisher-list',
  templateUrl: './publisher-list.component.html',
  styleUrls: ['./publisher-list.component.css']
})


export class PublisherListComponent implements OnInit {
  search: any;

  publishers: Observable<Publisher[]>;

  constructor(private publisherService: PublisherService, private router: Router) { }

  ngOnInit() {
    this.loadAllPublisher();
  }
  loadAllPublisher() {
    this.publishers = this.publisherService.getActiveAuthors();
  }

  publisherDetails(id: any) {
    this.router.navigate(['/store/publisherBook', id])
  }

}
