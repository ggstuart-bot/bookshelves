export function booksView({ data: { books } }) {
    const items = books.map((book) => `<li>${book.title}</li>`);
    return `
        <section>
            <header>
                <h1>Books</h1>
            </header>
            <ul>
                ${items.join("")}
            </ul>
        </section>
    `;
}
