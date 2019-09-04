import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, FormBuilder, Validators, ValidationErrors, AbstractControl } from '@angular/forms';
import { pipe, Observable } from 'rxjs';
import { BookService } from 'src/app/services/book.service';
import { map } from 'rxjs/operators';
import { BookViewModel } from 'src/app/model/book';
import { AuthService } from 'src/app/services/auth.service';
import { PurchaseService } from 'src/app/services/purchase.service';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-purchase-create',
  templateUrl: './purchase-create.component.html',
  styleUrls: ['./purchase-create.component.css']
})
export class PurchaseCreateComponent implements OnInit {
  purchaseForm: FormGroup;
  allBooks: {};
  allPublisher: {};

  myFormValueChanges$;
  totalAmount = 0;
  netAmount = 0;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private authService: AuthService,
    private purService: PurchaseService,
    private router: Router
  ) { }

  ngOnInit() {
    this.createPurchaseForm();
    this.loadDropDowns();
    this.purchaseForm.get('amount').setValue(this.netAmount);
    // initialize stream on quantity
    this.myFormValueChanges$ = this.purchaseForm.controls['purchaseLines'].valueChanges;
    // subscribe to the stream so listen to changes on quantity
    this.myFormValueChanges$.subscribe(units => this.updateTotalUnitPrice(units));

    // prevent mouse wheel scroll event on number input
    $('form').on('focus', 'input[type=number]', function (e) {
      $(this).on('mousewheel.disableScroll', function (ev) {
        ev.preventDefault();
      });
    });
    $('form').on('blur', 'input[type=number]', function (e) {
      $(this).off('mousewheel.disableScroll');
    });
  }


  private updateTotalUnitPrice(units: any) {
    const control = <FormArray>this.purchaseForm.controls['purchaseLines'];
    this.totalAmount = 0;
    // tslint:disable-next-line:forin
    for (const i in units) {
      const totalUnitPrice = (units[i].quantity * units[i].rate);
      // now format total price with angular currency pipe
      // let totalUnitPriceFormatted = this.currencyPipe.transform(totalUnitPrice, 'USD', 'symbol-narrow', '1.2-2');
      // update total sum field on unit and do not emit event myFormValueChanges$ in this case on units
      control.at(+i).get('itemTotal').setValue(totalUnitPrice, { onlySelf: true, emitEvent: false });
      this.totalAmount += totalUnitPrice;
      this.netAmount = this.totalAmount;
      this.purchaseForm.get('totalAmount').setValue(this.totalAmount);
    }
    this.updateNetAmount();
  }
  updateNetAmount() {
    this.purchaseForm.valueChanges.subscribe(res => {
      this.netAmount = (res.totalAmount + res.vatAmount) - res.discountAmount;
    });
  }

  createPurchaseForm() {
    const UserId = this.authService.getUserId();
    this.purchaseForm = this.fb.group({
      userId: [UserId, [Validators.required]],
      purchaseStatus: ['Ordered', [Validators.required]],
      purchaseDate: [new Date(), [Validators.required]],
      referenceNo: ['', [Validators.required]],
      totalAmount: [0, [Validators.required]],
      vatAmount: [0],
      discountAmount: [0],
      publisherId: ['', [Validators.required]],

      paymentMethod: ['Cash', [Validators.required]],
      amount: ['', [Validators.required]],
      bankName: [''],
      transactionId: [''],
      paymentNote: [''],

      purchaseLines: this.fb.array([
        this.purchaseLineArray()
      ])
    });
  }
  purchaseLineArray(): FormGroup {
    return this.fb.group({
      bookId: ['', Validators.required],
      quantity: ['', Validators.required],
      rate: ['', Validators.required],
      itemTotal: [0, Validators.required]
    });
  }

  get lineArray() { return <FormArray>this.purchaseForm.get('purchaseLines'); }

  loadDropDowns() {
    this.bookService.getPublisher().subscribe(res => {
      this.allPublisher = res;
    });
  }
  loadBookDropdown(e) {
    this.bookService.getBookByPublisherId(e).subscribe(res => {
      this.allBooks = res;
    });
  }

  addPurchaseLine(): void {
    (<FormArray>this.purchaseForm.get('purchaseLines')).push(this.purchaseLineArray());
  }

  removePurchaseLine(lineIndex: number): void {
    (<FormArray>this.purchaseForm.get('purchaseLines')).removeAt(lineIndex);
  }

  submit() {
    if (this.purchaseForm.invalid) {
      return;
    }
    this.purService.create(this.purchaseForm.value).subscribe(res => {
      console.log(res);
      this.purchaseForm.reset();
      this.router.navigate(['/dashboard/purchase-list']);

    }, e => console.log(e));
  }

  setPaymentValidators(selectedValue: string) {
    const accNo = this.purchaseForm.get('bankName') as AbstractControl;
    const trId = this.purchaseForm.get('transactionId') as AbstractControl;
    if (selectedValue === 'Cheque') {
      accNo.setValidators(Validators.required);
      trId.setValidators(Validators.required);
      accNo.setValue(null);
      trId.setValue(null);
      accNo.markAsUntouched;
      trId.markAsUntouched;
    } else {
      accNo.clearValidators();
      trId.clearValidators();
    }
    accNo.updateValueAndValidity();
    trId.updateValueAndValidity();
  }

  getFormValidationErrors() {
    Object.keys(this.purchaseForm.controls).forEach(key => {

      const controlErrors: ValidationErrors = this.purchaseForm.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
        });
      }
    });
  }


}
