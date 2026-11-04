import books from "../db/books.json" with { type: "json" };
import { createBook } from "../server/models/books.js";

for (const book of books) {
    createBook(book);
}
