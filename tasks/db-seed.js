import seed from "../db/seed.json" with { type: "json" };
import books from "../db/books.json" with { type: "json" };
import { createUser } from "../server/models/users.js";
import { createShelf } from "../server/models/shelves.js";
import { createBook } from "../server/models/books.js";
import { addBookToShelf } from "../server/models/shelfBooks.js";

const bookIds = {};
for (const book of books) {
    const { id } = createBook(book);
    bookIds[book.title] = id;
}

for (const user of seed.users) {
    await createUser(user);
}

// Temporary: these shelves will belong to users once there are users
for (const shelf of seed.shelves) {
    const { id: shelfId } = createShelf({ title: shelf.title });
    for (const title of shelf.books) {
        const bookId = bookIds[title];
        if (!bookId) {
            throw new Error(`Book '${title}' not found in books.json`);
        }
        addBookToShelf(shelfId, bookId);
    }
}
