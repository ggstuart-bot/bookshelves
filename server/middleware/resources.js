import { getShelfById } from "../models/shelves.js";
import { getBookById } from "../models/books.js";
import { NotFoundError } from "../tools/errors.js";

export function withShelf(ctx, next) {
    const { params: { shelfId } } = ctx;
    const shelf = getShelfById(Number(shelfId));
    if (!shelf) {
        throw new NotFoundError(`Shelf ${shelfId} not found`);
    }
    ctx.data.shelf = shelf;
    return next(ctx);
}

export function withBook(ctx, next) {
    const { params: { bookId } } = ctx;
    const book = getBookById(Number(bookId));
    if (!book) {
        throw new NotFoundError(`Book ${bookId} not found`);
    }
    ctx.data.book = book;
    return next(ctx);
}
