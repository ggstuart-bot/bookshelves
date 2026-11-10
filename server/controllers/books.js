import { searchBooks } from "../models/books.js";
import { render } from "../tools/render.js";
import { booksView } from "../views/books.js";

export function booksController(ctx) {
    const { url } = ctx;
    const q = url.searchParams.get("q") ?? "";
    ctx.data.q = q;
    ctx.data.books = searchBooks(q);
    ctx.data.title = "Books";
    return render(booksView, ctx);
}
