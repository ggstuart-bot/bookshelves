import { getBookById } from "../models/books.js";
import { addBookToShelf, removeBookFromShelf } from "../models/shelfBooks.js";
import { NotFoundError } from "../tools/errors.js";
import { redirect } from "../tools/redirect.js";

export function addBookController(ctx) {
    const { params: { bookId }, data: { shelf } } = ctx;
    const book = getBookById(Number(bookId));
    if (!book) {
        throw new NotFoundError(`Book ${bookId} not found`);
    }
    const changes = addBookToShelf(shelf.id, book.id);
    ctx.flash = changes
        ? `Book '${book.title}' added to '${shelf.title}'`
        : `Book '${book.title}' is already on '${shelf.title}'`;
    return redirect(`/books/${book.id}`, ctx);
}

export function removeBookController(ctx) {
    const { params: { bookId }, data: { shelf } } = ctx;
    const book = getBookById(Number(bookId));
    if (!book) {
        throw new NotFoundError(`Book ${bookId} not found`);
    }
    removeBookFromShelf(shelf.id, book.id);
    ctx.flash = `Book '${book.title}' removed`;
    return redirect(`/shelves/${shelf.id}`, ctx);
}
