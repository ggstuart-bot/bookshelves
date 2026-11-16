import { getBooks } from "../models/books.js";
import { render } from "../tools/render.js";
import { booksView } from "../views/books.js";

const PAGE_SIZE = 16;

export function booksController() {
    const books = getBooks(PAGE_SIZE);
    return render(booksView, { title: "Books", data: { books } });
}
