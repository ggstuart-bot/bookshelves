import { render } from "../tools/render.js";
import { booksView } from "../views/books.js";

export function booksController() {
    return render(booksView, { title: "Books" });
}
