import books from "../db/books.json" with { type: "json" };
import { createBook } from "../server/models/books.js";

// Temporary: seed only 40 books until we introduce paging
for (const book of books.slice(0, 40)) {
    createBook(book);
}
