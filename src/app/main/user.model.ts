import {Book} from "./book.model";

export class User {
  username:string;
  password:string;
  name:string;
  email:string;
  knjige: Book[];
  id:string;


  constructor() {
    this.username = '';
    this.password = '';
    this.name = '';
    this.email = '';
    this.knjige = [];
    this.id = '';
  }



  addBook(book: Book): void {
    this.knjige.push(book);
  }
}
