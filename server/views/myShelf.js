import { html } from "../tools/html.js";
import { bookCard } from "./partials/bookCard.js";
import { cardGrid } from "./partials/cardGrid.js";

export function myShelfView(ctx) {
    const { data: { shelf, books } } = ctx;

    return html`
        <section>
            <header>
                <h1>${shelf.title}</h1>
            </header>
            ${cardGrid(
                books.map(bookCard),
                html`No books yet, <a href="/books">find some books</a> to add`,
            )}
            <p><a href="/shelves">Back to all shelves</a></p>
        </section>
    `;
}
