import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { AuthService } from 'src/app/services/auth.service';
import { OrderViewModel, CheckoutViewModel, OrderLine } from 'src/app/model/order';

declare let $: any;

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

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
  }
 
  today = new Date();
  orderLines: any[];

  orders: {};
  itemCount: number;
  constructor(
    private orderService: OrderService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.loadOrder();
  }


  loadOrder() {
    const userId = this.authService.getUserId();
    this.orderService.getOrdersByUserId(userId).subscribe(res => {
      this.orders = res;
    });
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

           this.orderLines=res.orderLines;

          //  let resource = this.orderLines[0];
          console.log(res.orderLines);
        this.OpenModal();
      }
    )
  }


  OpenModal() {
    $('#OrderDetailsModal').modal('show');
  }
}
