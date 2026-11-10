import { html } from "../tools/html.js";
import { bookCard } from "./partials/bookCard.js";
import { searchForm } from "./partials/searchForm.js";

export function booksView(ctx) {
    const { data: { title, books, q, page, pageCount } } = ctx;
    const results = books.length
        ? html`<ul class="grid">${books.map(bookCard)}</ul>`
        : html`<p>${q ? `No books match "${q}"` : "No books found"}</p>`;

    return html`
        <section>
            <header>
                <h1>${title}</h1>
                ${q ? html`<p><a href="/books">show all books</a></p>` : ""}
            </header>
            ${searchForm(q)}
            ${results}
            ${pagination(page, pageCount)}
        </section>
    `;
}

// Previous, the current page and next. Nothing at all if there's only one page
function pagination(page, pageCount) {
    if (pageCount <= 1) return "";
    return html`<nav aria-label="Pagination">
            ${page > 1 ? html`<a href="/books?page=${page - 1}" rel="prev">previous</a>` : ""}
            <a href="/books?page=${page}" aria-current="page">page ${page} of ${pageCount}</a>
            ${page < pageCount ? html`<a href="/books?page=${page + 1}" rel="next">next</a>` : ""}
        </nav>`;
}
