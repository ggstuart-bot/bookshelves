import { html } from "../tools/html.js";
import { cardGrid } from "./partials/cardGrid.js";
import { shelfCard } from "./partials/shelfCard.js";
import { shelfTitleForm } from "./partials/shelfTitleForm.js";

export function myShelvesView(ctx) {
    const { data: { shelves, errors, values } } = ctx;
    const publicShelves = shelves.filter((shelf) => shelf.isPublic);
    const privateShelves = shelves.filter((shelf) => !shelf.isPublic);

    return html`
        <section>
            <header>
                <h1>My shelves</h1>
                <p>Make a shelf, then add books to it from any book's page.</p>
            </header>
            <h2>Public shelves</h2>
            <p>Anyone can see these shelves</p>
            ${cardGrid(publicShelves.map((shelf) => shelfCard(shelf)), "No public shelves yet")}
            <h2>Private shelves</h2>
            <p>Only you can see these shelves</p>
            ${cardGrid(privateShelves.map((shelf) => shelfCard(shelf)), "No private shelves yet")}
        </section>
        <aside>
            <h2>New shelf</h2>
            ${shelfTitleForm("/shelves", values?.title ?? "", errors?.title, "create")}
        </aside>
    `;
}
