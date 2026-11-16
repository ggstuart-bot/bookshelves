import { html } from "../tools/html.js";

export function myShelvesView(ctx) {
    const { data: { shelves } } = ctx;

    return html`
        <section>
            <header>
                <h1>Shelves</h1>
            </header>
            <h2>All shelves</h2>
            <ul class="grid">${shelves.map(shelfCard)}</ul>
        </section>
    `;
}

// Shelf lists always sit under an <h2>, so the title is an <h3>
function shelfCard(shelf) {
    return html`
        <li class="card shelf">
            <div>
                <h3>${shelf.title}</h3>
            </div>
        </li>
    `;
}
