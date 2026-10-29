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
    return `
        <li class="card book">
            <img class="cover" src="${book.coverUrl}" alt="" width="200" height="300" loading="lazy">
            <div>
                <h2>${book.title}</h2>
                <p>${book.author} (${book.year})</p>
            </div>
        </li>
    `;
}
