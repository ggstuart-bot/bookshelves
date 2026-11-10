import { bookCard } from "./partials/bookCard.js";

export function booksView(ctx) {
    const { data: { books, q } } = ctx;

    return `
        <section>
            <header>
                <h1>Books</h1>
            </header>
            ${searchForm(q)}
            <ul class="grid">
                ${books.map(bookCard).join("")}
            </ul>
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
