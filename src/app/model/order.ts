export class Order {
    orderId: number;
    userId: number;
    orderDate: Date;
    totalAmount: number;
    vatAmount: number;
    discountAmount: number;
    netAmount: number;

    orderStatus: string;
}
export class OrderViewModel {
    orderId: number;
    orderStatus: string;
    userID: string;
    orderDate: string;
    totalAmount: number;
    vatAmount: number;
    discountAmount: number;
    shippingAddressId: number;
    paymentId: number;
    orderLineId: number;
    bookId: number;
    quantity: number;
    rate: number;
    netAmount: number;
}

export class CheckoutViewModel {
    orderId: number;
    orderStatus: string;
    userID: string;
    orderDate: string;
    totalAmount: number;
    vatAmount: number;
    discountAmount: number;
    shippingAddressId: number;
    paymentId: number;
    netAmount: number;

    //payment
    paymentMethod: string;
    amount: number;
    bankName: string;
    accountNo: string;
    transactionId: string;
    paymentNote: string;

    //address
    addressId: number;
    name: string;
    phone: string;
    email: string;
    district: string;
    address: string;

    //user data
    firstName: string;
    lastName: string;
    userEmail: string;
    userPhone: string;

    bookName: string;
  transationId: any;
  orderLines:OrderLine[];

}

export class OrderLine {
    bookName: string;
    orderLineId: number;
    bookId: number;
    quantity: number;
    rate: number;
    itemTotal: number;
    amount: number;

}
