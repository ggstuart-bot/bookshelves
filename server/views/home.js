import { html } from "../tools/html.js";
import { cardGrid } from "./partials/cardGrid.js";
import { shelfCard } from "./partials/shelfCard.js";
import { searchForm } from "./partials/searchForm.js";

export function homeView(ctx) {
    const { data: { publicShelves } } = ctx;

    return html`
        <section>
            <header>
                <h1>Welcome to Bookshelves</h1>
                <p>Organise your books with bookshelves.</p>
            </header>
            <h2>Find a book</h2>
            ${searchForm()}
            <h2>Public shelves</h2>
            ${cardGrid(
                publicShelves.map((shelf) => shelfCard(shelf, ownerLink(shelf))),
                "Nobody has shared a shelf yet",
            )}
        </section>
    `;
}

// Placeholder: this will need to change when users have avatars
function ownerLink(shelf) {
    return html`<a href="/users/${shelf.ownerId}">${shelf.username}</a>`;
}
