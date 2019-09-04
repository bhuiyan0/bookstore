import { Component, OnInit } from '@angular/core';
import { PurchaseService } from 'src/app/services/purchase.service';
import { Observable } from 'rxjs';
import { OrderViewModel } from 'src/app/model/order';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {

  purchaseList: Observable<OrderViewModel[]>;
  key = 'publisherName';
  reverse = false;
  p = 1;
  row = 5;
  search: any;

  constructor(
    private purchaseService: PurchaseService
  ) { }

  ngOnInit() {
    this.loadPurchaseList();
  }

  loadPurchaseList() {
   this.purchaseList = this.purchaseService.getAll();
  }
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
}
}
