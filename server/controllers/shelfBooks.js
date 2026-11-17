import { getBookById } from "../models/books.js";
import { getShelfById } from "../models/shelves.js";
import { addBookToShelf } from "../models/shelfBooks.js";
import { NotFoundError } from "../tools/errors.js";
import { redirect } from "../tools/redirect.js";

export function addBookController(ctx) {
    const { params: { shelfId, bookId } } = ctx;
    const shelf = getShelfById(Number(shelfId));
    if (!shelf) {
        throw new NotFoundError(`Shelf ${shelfId} not found`);
    }
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
    const { params: { shelfId, bookId } } = ctx;
    return new Response(`Remove book ${bookId} from shelf ${shelfId}`);
}
