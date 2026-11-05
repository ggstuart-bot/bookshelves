import { html } from "../tools/html.js";
import { bookCard } from "./partials/bookCard.js";
import { cardGrid } from "./partials/cardGrid.js";
import { postButton } from "./partials/postButton.js";
import { shelfTitleForm } from "./partials/shelfTitleForm.js";

export function myShelfView(ctx) {
    const { data: { shelf, books } } = ctx;

    return html`
        <section>
            <header>
                <h1>${shelf.title}</h1>
            </header>
            ${cardGrid(
                books.map((book) => bookCard(book, removeForm(shelf, book))),
                html`No books yet, <a href="/books">find some books</a> to add`,
            )}
            <p><a href="/shelves">Back to all shelves</a></p>
        </section>
        <aside>
            <h2>Rename shelf</h2>
            ${shelfTitleForm(`/shelves/${shelf.id}/edit`, shelf.title, "", "rename")}
        </aside>
    `;
}

function removeForm(shelf, book) {
    return postButton(`/shelves/${shelf.id}/books/${book.id}/delete`, "remove");
}
