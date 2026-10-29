import { countBooks, getBooks, PAGE_SIZE } from "../models/books.js";
import { render } from "../tools/render.js";
import { booksView } from "../views/books.js";

export function booksController(ctx) {
    const { url } = ctx;
    let page = Number(url.searchParams.get("page"));
    if (!Number.isSafeInteger(page) || page < 1) page = 1;
    const books = getBooks(page);
    const hasNext = page * PAGE_SIZE < countBooks();
    return render(booksView, { title: "Books", data: { books, page, hasNext } });
}
