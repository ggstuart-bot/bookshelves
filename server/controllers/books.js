import { getBooks } from "../models/books.js";
import { render } from "../tools/render.js";
import { booksView } from "../views/books.js";

const PAGE_SIZE = 16;

export function booksController(ctx) {
    const { url } = ctx;
    const pageParam = url.searchParams.get("page");
    let page = pageParam === null ? 1 : Number(pageParam);
    if (!Number.isSafeInteger(page) || page < 1) page = 1;
    const books = getBooks(page, PAGE_SIZE);
    return render(booksView, { title: "Books", data: { books } });
}
