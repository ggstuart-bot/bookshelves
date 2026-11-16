import { searchForm } from "./partials/searchForm.js";

const DEFAULT_COVER = "/assets/default-cover.svg";

export function booksView(ctx) {
    const { data: { title, books, q, page, pageCount } } = ctx;
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
            ${pagination(q, page, pageCount)}
        </section>
    `;
}

function bookCard(book) {
    const cover = book.coverUrl ?? DEFAULT_COVER;
    return `
        <li class="card book">
            <img class="cover" src="${cover}" alt="" width="200" height="300" loading="lazy">
            <div>
                <h2>${book.title}</h2>
                <p>${book.author}${book.year ? ` (${book.year})` : ""}</p>
            </div>
        </li>
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
