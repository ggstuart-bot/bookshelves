import { bookCard } from "./partials/bookCard.js";

export function booksView({ data: { books, page, hasNext } }) {
    return `
        <section>
            <header>
                <h1>Books</h1>
            </header>
            <ul class="grid">
                ${books.map(bookCard).join("")}
            </ul>
            ${pagination(page, hasNext)}
        </section>
    `;
}

// Previous, the current page and next. Nothing at all if there's only one page
function pagination(page, hasNext) {
    if (page === 1 && !hasNext) return "";
    return `<nav aria-label="Pagination">
            ${page > 1 ? `<a href="${pageUrl(page - 1)}" rel="prev">previous</a>` : ""}
            <a href="${pageUrl(page)}" aria-current="page">page ${page}</a>
            ${hasNext ? `<a href="${pageUrl(page + 1)}" rel="next">next</a>` : ""}
        </nav>`;
}

function pageUrl(page) {
    return `/books?${new URLSearchParams({ page })}`;
}
