import { countPages, getBooks } from "../models/books.js";
import { render } from "../tools/render.js";
import { booksView } from "../views/books.js";
import { notFoundController } from "./notFound.js";

const PAGE_SIZE = 16;

export function booksController(ctx) {
    const { url } = ctx;
    const pageParam = url.searchParams.get("page");
    const page = pageParam === null ? 1 : Number(pageParam);
    const pageCount = Math.max(1, countPages(PAGE_SIZE));
    if (!Number.isSafeInteger(page) || page < 1 || page > pageCount) {
        return notFoundController();
    }
    const books = getBooks(page, PAGE_SIZE);
    return render(booksView, { title: "Books", data: { books, page, pageCount } });
}
