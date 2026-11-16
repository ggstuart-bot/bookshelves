import { getBookById } from "../models/books.js";
import { NotFoundError } from "../tools/errors.js";

export function withBook(ctx, next) {
    const { params: { bookId } } = ctx;
    const book = getBookById(Number(bookId));
    if (!book) {
        throw new NotFoundError(`Book ${bookId} not found`);
    }
    ctx.data.book = book;
    return next(ctx);
}
