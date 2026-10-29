import { getBooks } from "../server/models/books.js";

for (const book of getBooks()) {
    console.log(book.id, book.title, book.author, book.year);
}
