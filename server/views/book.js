import { html } from "../tools/html.js";

export function bookView(ctx) {
    const { data: { book } } = ctx;

    return html`
        <section>
            <header>
                <h1>${book.title}</h1>
                <p>by ${book.author}</p>
            </header>
            ${book.year ? html`<p>Published ${book.year}</p>` : ""}
            <p><a href="/books">Back to all books</a></p>
        </section>
    `;
}
