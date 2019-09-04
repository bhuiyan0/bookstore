export class Book {
    BookId: number;
    BookName: string;
    CategoryId: number;
    AutorId: number;
    PublisherId: number;
    Descriptions: string;
    Price: number;
    Edition: string;
    ISBN: string;
    TranslatorId: number;
    NumberOfPage: number;
    Language: string;
    ImageUrl: string;
}

export class BookViewModel {
    bookId: number;
    bookName: string;
    categoryId: number;
    authorId: number;
    publisherId: number;
    descriptions: string;
    costPrice: number;
    sellingPrice: number;
    edition: string;
    isbn: string;
    translatorId: number;
    numberOfPage: number;
    language: string;
    imageUrl: string;

    quantity: number;
    reorderLevel: number;
    authorName: string;
    publisherName: string;
    categoryName: string;

    itemTotal:number;
}

export class BookEditModel {
    bookId: number;
    bookName: string;
    categoryId: number;
    authorId: number;
    publisherId: number;
    descriptions: string;
    costPrice: number;
    sellingPrice: number;
    edition: string;
    isbn: string;
    translatorId: number;
    numberOfPage: number;
    language: string;
    imageUrl: string;

    reorderLevel: number;
}

