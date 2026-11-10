import { bookCard } from "./partials/bookCard.js";

export function booksView(ctx) {
    const { data: { title, books, q } } = ctx;
    const results = books.length
        ? `<ul class="grid">${books.map(bookCard).join("")}</ul>`
        : `<p>${q ? `No books match "${q}"` : "No books found"}</p>`;

    return `
        <section>
            <header>
                <h1>${title}</h1>
                ${q ? `<p><a href="/books">show all books</a></p>` : ""}
            </header>
            ${searchForm(q)}
            ${results}
        </section>
    `;
}

function searchForm(q) {
    return `
        <search>
            <form method="GET" action="/books">
                <label for="q">Search by title or author</label>
                <input id="q" type="search" name="q" value="${q}">
                <button>search</button>
            </form>
        </search>
    `;
}
