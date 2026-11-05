import { html } from "../tools/html.js";
import { cardGrid } from "./partials/cardGrid.js";

export function myShelvesView(ctx) {
    const { data: { shelves, errors, values } } = ctx;

    return html`
        <section>
            <header>
                <h1>Shelves</h1>
            </header>
            <h2>All shelves</h2>
            ${cardGrid(shelves.map(shelfCard), "No shelves yet")}
        </section>
        <aside>
            <h2>New shelf</h2>
            <form class="secondary" method="POST" action="/shelves">
                <label for="title">Title</label>
                <input id="title" name="title" value="${values?.title ?? ""}"
                    aria-describedby="title-error" aria-invalid="${Boolean(errors?.title)}">
                <span id="title-error" class="error">${errors?.title ?? ""}</span>
                <button>create</button>
            </form>
        </aside>
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
