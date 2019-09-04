export class Cart {
    cartId: number;
    userId: string;
    bookId: number;
    quantity: number
}

export class CartViewModel {
    cartId:number;
    userId: string;
    bookId: number;
    bookName: string;
    authorName:string;
    price:number;
    quantity:number;
    total:number;
    imageUrl:string;
}
