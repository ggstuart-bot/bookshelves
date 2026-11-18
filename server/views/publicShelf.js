import { html } from "../tools/html.js";
import { bookCard } from "./partials/bookCard.js";
import { cardGrid } from "./partials/cardGrid.js";

export function publicShelfView(ctx) {
    const { data: { shelf, books, owner } } = ctx;

    return html`
        <section>
            <header>
                <h1>${shelf.title}</h1>
                <p>A shelf by ${owner.username}</p>
            </header>
            ${cardGrid(books.map((book) => bookCard(book)), "No books on this shelf yet")}
            <p><a href="/">Back to home</a></p>
        </section>
    `;
}
