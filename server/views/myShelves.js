import { html } from "../tools/html.js";
import { DEFAULT_COVER } from "./partials/bookCard.js";
import { cardGrid } from "./partials/cardGrid.js";
import { shelfTitleForm } from "./partials/shelfTitleForm.js";
import { visibilityButton } from "./partials/visibilityButton.js";

// Placeholder: this will need to change when we add public and private sections
export function myShelvesView(ctx) {
    const { user, data: { shelves, errors, values } } = ctx;

    return html`
        <section>
            <header>
                <h1>My shelves</h1>
                <p>Make a shelf, then add books to it from any book's page.</p>
            </header>
            <h2>Private shelves</h2>
            <p>Only you can see these shelves</p>
            ${cardGrid(
                shelves.map((shelf) => shelfCard(shelf, visibilityButton(user, shelf))),
                "No private shelves yet",
            )}
            ${user.isPublic
                ? ""
                : html`<p><a href="/profile">Publish your profile</a> to share shelves</p>`}
        </section>
        <aside>
            <h2>New shelf</h2>
            ${shelfTitleForm("/shelves", values?.title ?? "", errors?.title, "create")}
        </aside>
    `;
}

// A shelf as a card in a .grid list, with a fanned row of its first few covers.
// Shelf lists always sit under an <h2>, so the title is an <h3>
function shelfCard(shelf, footer) {
    return html`
        <li class="card shelf">
            ${shelf.thumbnails.length
                ? html`<div class="covers">${shelf.thumbnails.map(coverImage)}</div>`
                : html`<p class="covers">No books yet</p>`}
            <div>
                <div class="row">
                    <h3><a href="/shelves/${shelf.id}">${shelf.title}</a></h3>
                    <p>${shelf.bookCount} ${shelf.bookCount === 1 ? "book" : "books"}</p>
                </div>
                ${footer ? html`<footer>${footer}</footer>` : ""}
            </div>
        </li>
    `;
}

function coverImage(book) {
    return html`<img src="${
        book.thumbnailUrl ?? DEFAULT_COVER
    }" alt="" width="64" height="96" loading="lazy">`;
}
