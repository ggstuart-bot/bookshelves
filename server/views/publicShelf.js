import { html } from "../tools/html.js";
import { bookCard } from "./partials/bookCard.js";
import { cardGrid } from "./partials/cardGrid.js";

// Placeholder: this will need to change when users have avatars
export function publicShelfView(ctx) {
    const { data: { shelf, books, owner } } = ctx;

    return html`
        <section>
            <header>
                <h1>${shelf.title}</h1>
                <p>A public shelf by <a href="/users/${owner.id}">${owner.username}</a></p>
            </header>
            ${cardGrid(books.map((book) => bookCard(book)), "No books on this shelf yet")}
            <p><a href="/">Back to home</a></p>
        </section>
    `;
}
