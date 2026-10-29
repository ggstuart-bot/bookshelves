import { bookCard } from "./partials/bookCard.js";
import { cardGrid } from "./partials/cardGrid.js";

export function booksView({ data: { books } }) {
    return `
        <section>
            <header>
                <h1>Books</h1>
            </header>
            ${cardGrid(books.map((book) => bookCard(book)), "No books found")}
        </section>
    `;
}
