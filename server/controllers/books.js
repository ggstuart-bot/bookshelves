import { getBooks } from "../models/books.js";
import { render } from "../tools/render.js";
import { booksView } from "../views/books.js";

export function booksController(ctx) {
    const books = getBooks();
    return render(booksView, { title: "Books", data: { books } });
}
