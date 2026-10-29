export function booksView({ data: { books } }) {
    return `
        <section>
            <header>
                <h1>Books</h1>
            </header>
            <ul class="grid">
                ${books.map(bookItem).join("")}
            </ul>
        </section>
    `;
}

function bookItem(book) {
    return `<li>${book.title}</li>`;
}
