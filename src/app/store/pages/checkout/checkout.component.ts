import { Component, OnInit, NgModule, DoCheck } from '@angular/core';
import { FormsModule, FormControl, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { map, startWith, max } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';
import { CartService } from 'src/app/services/cart.service';
import { Cart, CartViewModel } from 'src/app/model/cart';
import { Router } from '@angular/router';
declare let $: any;

@NgModule({
  imports: [
    FormsModule,
    BrowserModule
  ]
})

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})


export class CheckoutComponent implements OnInit {

  show = false;
  address = false;
  districts = [];
  options: string[] = [
    'Barguna',
    'Barisal',
    'Bhola',
    'Jhalokati',
    'Patuakhali',
    'Pirojpur ',
    'Bandarban',
    'Brahmanbaria',
    'Chandpur',
    'Chittagong',
    'Comilla',
    'Cox\'s Bazar',
    'Feni',
    'Khagrachhari',
    'Lakshmipur',
    'Noakhali',
    'Rangamati',
    'Dhaka',
    'Faridpur',
    'Gazipur',
    'Gopalganj',
    'Jamalpur',
    'Kishoreganj',
    'Madaripur',
    'Manikganj',
    'Munshiganj',
    'Mymensingh',
    'Narayanganj',
    'Narsingdi',
    'Netrakona',
    'Rajbari',
    'Shariatpur',
    'Sherpur',
    'Tangail',
    'Bagerhat',
    'Chuadanga',
    'Jessore',
    'Jhenaidah',
    'Khulna',
    'Kushtia',
    'Magura',
    'Meherpur',
    'Narail',
    'Satkhira',
    'Bogra',
    'Joypurhat',
    'Naogaon',
    'Natore ',
    'Nawabganj',
    'Pabna',
    'Rajshahi',
    'Sirajganj',
    'Dinajpur',
    'Gaibandha',
    'Kurigram',
    'Lalmonirhat',
    'Nilphamari',
    'Panchagarh',
    'Rangpur',
    'Thakurgaon',
    'Habiganj',
    'Moulvibazar',
    'Sunamganj',
    'Sylhet'
  ];
  filteredOptions: Observable<string[]>;
  showAutocomplete: boolean;
  netAmount: number;
  orderId: number;
  orderForm: FormGroup;

  lastId: number;
  isCash = true;
  iCash = true;
  iBkash: boolean;
  iRocket: boolean;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private orderService: OrderService,
    private cartService: CartService,
    private router: Router
  ) { }


  ngOnInit() {
    this.createOrderForm();
    this.getCartByUser();
    this.loadDistrict();
    this.orderService.getLastId().subscribe(res => {
      this.lastId = res + 1;
    });

    this.orderForm.get('paymentMethod').valueChanges.subscribe(val => {
      this.setPaymentValidators(val);
      this.showHidePaymentMethod(val);
    });
  }
  // ngDoCheck(): void {
  //   this.orderForm.get('paymentMethod').valueChanges.subscribe(val => {
  //     this.setPaymentValidators(val);
  //     this.showHidePaymentMethod(val);
  //   })
  // }
  showHidePaymentMethod(val: any) {
    if (val === 'Cash On Delivery') {
      this.isCash = true;
      this.iCash = true;
      this.iBkash = false;
      this.iRocket = false;
    }
    if (val === 'Bkash') {
      this.isCash = false;
      this.iCash = false;
      this.iBkash = true;
      this.iRocket = false;
    }
    if (val === 'Rocket') {
      this.isCash = false;
      this.iCash = false;
      this.iBkash = false;
      this.iRocket = true;
    }
  }

  loadDistrict() {
    this.filteredOptions = this.orderForm.get('district').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  updatedVal(e) {
    if (e && e.length >= 1) {
      this.showAutocomplete = true;
    } else {
      this.showAutocomplete = false;
    }
  }


  createOrderForm() {
    // tslint:disable-next-line:max-line-length
    const emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const phonePattern: RegExp = /^(01[1-9](\d{8})$)/;

    const UserId = this.authService.getUserId();
    this.orderForm = this.fb.group({
      userID: [UserId, [Validators.required]],  // current userid
      orderStatus: ['Processing', [Validators.required]],  // default : processing
      orderDate: [new Date(), [Validators.required]],  // default:  current date

      // payment
      paymentMethod: ['Cash On Delivery', [Validators.required]],
      amount: ['', [Validators.required]],  // total amount
      accountNo: [''],   // bkash or rocket no
      transactionId: [''],
      paymentNote: [''],

      // address
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20), Validators.pattern('^[a-zA-Z ]*$')]],
      phone: ['', [Validators.required, Validators.pattern(phonePattern)]],
      email: ['', [Validators.required, Validators.pattern(emailregex)]],
      district: ['', [Validators.required]],
      address: ['', [Validators.required]],

      // orderLines
      orderLines: this.fb.array([
        this.orderLineArray()
      ])
    });
  }
  orderLineArray(): FormGroup {
    return this.fb.group({
      bookId: ['', Validators.required],
      quantity: ['', Validators.required],
      rate: ['', Validators.required],
      itemTotal: [0, Validators.required],
      bookName: ['']
    });
  }
  get lineArray() { return <FormArray>this.orderForm.get('orderLines'); }

  getCartByUser() {
    const userId = this.authService.getUserId();
    this.orderService.getCartByUser(userId).subscribe((res: CartViewModel[]) => {
      this.orderForm.setControl('orderLines', this.setExistingCart(res));
    });
  }

  // for email validation
  getErrorEmail() {
    return this.orderForm.get('email').hasError('required') ? 'Field is required' :
      this.orderForm.get('email').hasError('pattern') ? 'Not a valid email address' : '';
  }

  setExistingCart(cartLine: CartViewModel[]): FormArray {
    const formArray = new FormArray([]);
    let total = 0;
    cartLine.forEach(c => {
      formArray.push(this.fb.group({
        bookId: c.bookId,
        quantity: c.quantity,
        rate: c.price,
        itemTotal: c.total,
        bookName: c.bookName,
      }));
      total += c.total;
    });
    this.netAmount = total;
    this.orderForm.get('amount').setValue(total);
    return formArray;
  }

  submit() {
    const userId = this.authService.getUserId();
    if (this.orderForm.invalid) {
      return;
    } else {
      this.orderService.create(this.orderForm.value).subscribe(res => {
        console.log(res);
      }, err => console.log(err));

      // delete all item from cart
      this.cartService.deleteByUserId(userId).subscribe(res => {
        console.log(res);
      });
      this.router.navigate(['/store/myOrders']);
    }
  }

  setPaymentValidators(selectedValue: string) {
    const accNo = this.orderForm.get('accountNo');
    const trId = this.orderForm.get('transactionId');
    if (selectedValue === 'Cash On Delivery') {
      accNo.clearValidators();
      trId.clearValidators();
      accNo.setValue(null);
      trId.setValue(null);
      accNo.markAsUntouched;
      trId.markAsUntouched;
    } else {
      accNo.setValidators(Validators.required);
      trId.setValidators(Validators.required);

    }
    accNo.updateValueAndValidity();
    trId.updateValueAndValidity();
  }
}
