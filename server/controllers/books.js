import { searchBooks } from "../models/books.js";
import { render } from "../tools/render.js";
import { booksView } from "../views/books.js";

const PAGE_SIZE = 16;

export function booksController(ctx) {
    const { url } = ctx;
    const q = url.searchParams.get("q") ?? "";
    const pageParam = url.searchParams.get("page");
    let page = pageParam === null ? 1 : Number(pageParam);
    if (!Number.isSafeInteger(page) || page < 1) page = 1;
    ctx.data.q = q;
    ctx.data.books = searchBooks(q, page, PAGE_SIZE);
    ctx.data.title = q ? `Books matching "${q}"` : "Books";
    return render(booksView, ctx);
}
