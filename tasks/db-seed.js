import books from "../db/books.json" with { type: "json" };
import { createBook } from "../server/models/books.js";

// Placeholder: this will need to change when we seed all the books
for (const book of books.slice(0, 20)) {
    createBook(book);
}
