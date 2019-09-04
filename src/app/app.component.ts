import { Component, OnInit } from '@angular/core';

import { LoadJsService } from './services/load-js.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private jsService: LoadJsService) {
   }

  ngOnInit() {
    this.loadScripts();
  }

  private loadScripts() {
    // You can load multiple scripts by just providing the key as argument into load method of the service
    this.jsService.load('custom').then(data => {
    }).catch(error => console.log(error));
  }
}

