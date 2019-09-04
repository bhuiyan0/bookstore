import { Component, OnInit } from '@angular/core';
import { CheckoutViewModel, OrderViewModel } from 'src/app/model/order';
import { OrderService } from 'src/app/services/order.service';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: [
    './order.component.css',
  ]
})
export class OrderComponent implements OnInit {
  search: any;
  order = {
    amount: 0,
    paymentMethod: null,
    accountNo: '',
    transactionId: '',
    paymentNote: '',
    bankName: '',

    name: null,
    phone: null,
    email: null,
    district: null,
    address: null,

    orderStatus: null,
    orderDate: null,
    orderId: 0,

    firstName: null,
    lastName: null,
    userEmail: null,
    userPhone: null,
  };

  today = new Date();
  orderLines: any[];

  key = 'orderDate';
  reverse = false;
  p = 1;
  row = 5;

  orders: {};
  // asyncOrders:Observable<any[]>;
  itemCount: number;
  statusForm: FormGroup;
  idForUpdate: any;
  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.loadOrder();
    this.createStatusForm();
  }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  loadOrder() {
    this.orderService.getAllByVM().subscribe(res => {
      this.orders = res;
    });
  }
  createStatusForm() {
    this.statusForm = this.fb.group({
      orderStatus: ['']
    });
  }

  updateStart(id: any) {
    this.idForUpdate = id;
    this.orderService.getOrdersOrderId(id).subscribe((res: OrderViewModel) => {
      this.statusForm.patchValue({
        orderStatus: res.orderStatus
      });
      $('#editModal').modal('show');
    });
  }

  updateConfirm() {
    this.orderService.update(this.idForUpdate, this.statusForm.value).subscribe(res => {
      this.statusForm.reset();
      this.closeUpdate();
      this.closeMainModal();
      this.loadOrder();
    });
  }

  closeUpdate() {
    this.idForUpdate = null;
    $('#editModal').modal('hide');

  }
  viewData(id: any) {
    this.orderService.getOrdersOrderId(id).subscribe(
      (res: CheckoutViewModel) => {
        // const array = new Array([]);

        this.order.accountNo = res.accountNo,
          this.order.address = res.address,
          this.order.amount = res.amount,
          this.order.transactionId = res.transactionId,
          this.order.paymentNote = res.paymentNote,
          this.order.paymentMethod = res.paymentMethod,
          this.order.bankName = res.bankName,
          this.order.name = res.name,
          this.order.email = res.email,
          this.order.phone = res.phone,
          this.order.district = res.district,
          this.order.orderStatus = res.orderStatus,
          this.order.orderDate = res.orderDate,
          this.order.orderId = res.orderId,
          this.order.firstName = res.firstName,
          this.order.lastName = res.lastName,
          this.order.firstName = res.firstName,
          this.order.userEmail = res.userEmail,
          this.order.userPhone = res.userPhone,

          this.orderLines = res.orderLines;

        //  let resource = this.orderLines[0];
        console.log(res.orderLines);
        this.OpenModal();
      }
    );
  }


  OpenModal() {
    $('#OrderDetailsModal').modal('show');
  }

  closeMainModal() {
    $('#OrderDetailsModal').modal('hide');
  }

  printPage() {
    window.print();
  }

  printDiv(divName) {
    const printContents = document.getElementById(divName).innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.focus();
    window.print();
    document.body.innerHTML = originalContents;
    // window.close();
    self.close();

    // $('#OrderDetailsModal').modal('hide');
  }

  printDivs(divName) {
    const content = document.getElementById(divName).innerHTML;
    const mywindow = window.open();

    mywindow.document.write('<html><head><title>Print</title>');
    mywindow.document.write('</head><body >');
    mywindow.document.write(content);
    mywindow.document.write('</body></html>');
    mywindow.document.close();
    mywindow.focus();
    mywindow.print();
    mywindow.close();
    return false;
  }
}
