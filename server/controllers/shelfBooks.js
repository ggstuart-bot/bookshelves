import { addBookToShelf } from "../models/shelfBooks.js";
import { redirect } from "../tools/redirect.js";

// Placeholder: this will need to change when we add flash messages
export function addBookController(ctx) {
    const { data: { shelf, book } } = ctx;
    addBookToShelf(shelf.id, book.id);
    return redirect(`/books/${book.id}`);
}
