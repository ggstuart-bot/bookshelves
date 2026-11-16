import { getBooks } from "../models/books.js";
import { render } from "../tools/render.js";
import { booksView } from "../views/books.js";

const PAGE_SIZE = 16;

export function booksController(ctx) {
    ctx.data.books = getBooks(PAGE_SIZE);
    ctx.data.title = "Books";
    return render(booksView, ctx);
}
