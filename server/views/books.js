import { bookCard } from "./partials/bookCard.js";
import { searchForm } from "./partials/searchForm.js";

export function booksView(ctx) {
    const { data: { title, books, q } } = ctx;

    return `
        <section>
            <header>
                <h1>${title}</h1>
                ${q ? `<p><a href="/books">show all books</a></p>` : ""}
            </header>
            ${searchForm(q)}
            ${cardGrid(books.map(bookCard), q ? `No books match "${q}"` : "No books found")}
        </section>
    `;
}

function cardGrid(cards, emptyMessage) {
    return cards.length ? `<ul class="grid">${cards.join("")}</ul>` : `<p>${emptyMessage}</p>`;
}
