import seed from "../db/seed.json" with { type: "json" };
import books from "../db/books.json" with { type: "json" };
import { createShelf } from "../server/models/shelves.js";
import { createBook } from "../server/models/books.js";

for (const book of books) {
    createBook(book);
}

// Temporary: these shelves will belong to users once there are users
for (const shelf of seed.shelves) {
    createShelf({ title: shelf.title });
}
