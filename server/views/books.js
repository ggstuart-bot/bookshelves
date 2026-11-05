import { bookCard } from "./partials/bookCard.js";

export function booksView(ctx) {
    const { data: { books, q, page, pageCount } } = ctx;

    return `
        <section>
            <header>
                <h1>Books</h1>
            </header>
            ${searchForm(q)}
            <ul class="grid">
                ${books.map(bookCard).join("")}
            </ul>
            ${pagination(q, page, pageCount)}
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

// Previous, the current page and next. Nothing at all if there's only one page
function pagination(q, page, pageCount) {
    if (pageCount <= 1) return "";
    return `<nav aria-label="Pagination">
            ${page > 1 ? `<a href="${pageUrl(q, page - 1)}" rel="prev">previous</a>` : ""}
            <a href="${pageUrl(q, page)}" aria-current="page">page ${page} of ${pageCount}</a>
            ${page < pageCount ? `<a href="${pageUrl(q, page + 1)}" rel="next">next</a>` : ""}
        </nav>`;
}

// Only keep q in the link if there's a search
function pageUrl(q, page) {
    const params = q ? { q, page } : { page };
    return `/books?${new URLSearchParams(params)}`;
}
