import { html } from "../tools/html.js";
import { cardGrid } from "./partials/cardGrid.js";
import { shelfCard } from "./partials/shelfCard.js";
import { shelfTitleForm } from "./partials/shelfTitleForm.js";

export function myShelvesView(ctx) {
    const { data: { shelves, errors, values } } = ctx;

    return html`
        <section>
            <header>
                <h1>My shelves</h1>
                <p>Make a shelf, then add books to it from any book's page.</p>
            </header>
            <h2>Your shelves</h2>
            ${cardGrid(shelves.map(shelfCard), "No shelves yet")}
        </section>
        <aside>
            <h2>New shelf</h2>
            ${shelfTitleForm("/shelves", values?.title ?? "", errors?.title, "create")}
        </aside>
    `;
}
