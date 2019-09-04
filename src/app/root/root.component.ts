import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: [
    './root.component.css',
  ]
})


export class RootComponent implements OnInit {
  api: string = 'mvc';
  app: string = 'store';

  constructor(private router: Router) { }
  ngOnInit() {

  }

  go(): void {
    if (this.api === 'mvc') {
      localStorage.setItem("apiKey", "http://store-api.mamunbhuiyan.me");
    }
    if (this.api === 'core') {
      localStorage.setItem("apiKey", "http://store-api.mamunbhuiyan.me");
    }

    if (this.app === 'dashboard') {
      this.router.navigate(['/login']);
    }
    if (this.app === 'store') {
      this.router.navigate(['/store']);
    }

  }
}
