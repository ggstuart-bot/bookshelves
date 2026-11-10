import { bookCard } from "./partials/bookCard.js";

export function booksView(ctx) {
    const { data: { books } } = ctx;

    return `
        <section>
            <header>
                <h1>Books</h1>
            </header>
            ${searchForm()}
            <ul class="grid">
                ${books.map(bookCard).join("")}
            </ul>
        </section>
    `;
}

function searchForm() {
    return `
        <search>
            <form method="GET" action="/books">
                <label for="q">Search by title or author</label>
                <input id="q" type="search" name="q">
                <button>search</button>
            </form>
        </search>
    `;
}
