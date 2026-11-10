import { getBooks } from "../models/books.js";
import { render } from "../tools/render.js";
import { booksView } from "../views/books.js";

export function booksController(ctx) {
    ctx.data.books = getBooks();
    ctx.data.title = "Books";
    return render(booksView, ctx);
}
