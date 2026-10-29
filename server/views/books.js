export function booksView({ data: { books } }) {
    const items = books.map((book) => `
        <li>
            <img src="${book.coverUrl}" alt="" width="200" height="300" loading="lazy">
            <h2>${book.title}</h2>
            <p>${book.author} (${book.year})</p>
        </li>
    `);
    return `
        <section>
            <header>
                <h1>Books</h1>
            </header>
            <ul class="grid">
                ${items.join("")}
            </ul>
        </section>
    `;
}
