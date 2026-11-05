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

// Placeholder: this will need to change when users have avatars and admin rights
for (const user of seed.users) {
    const { id: userId } = await createUser(user);

    // Placeholder: this will need to change when shelves can be public
    for (const shelf of user.shelves) {
        const { id: shelfId } = createShelf({ title: shelf.title, ownerId: userId });
        for (const title of shelf.books) {
            const bookId = bookIds[title];
            if (!bookId) {
                throw new Error(`Book '${title}' not found in books.json`);
            }
            addBookToShelf(shelfId, bookId);
        }
    }
}
