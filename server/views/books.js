export function booksView({ data: { books } }) {
    return `
        <section>
            <header>
                <h1>Books</h1>
            </header>
            <ul class="grid">
                ${books.map(bookCard).join("")}
            </ul>
        </section>
    `;
}

function bookCard(book) {
    return `
        <li class="card">
            <div>
                <h2>${book.title}</h2>
                <p>${book.author} (${book.year})</p>
            </div>
        </li>
    `;
}
