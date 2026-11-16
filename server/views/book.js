import { html } from "../tools/html.js";

export function bookView(ctx) {
    const { data: { book } } = ctx;

    return html`
        <section>
            <header>
                <h1>${book.title}</h1>
            </header>
            <p>Book ${book.id}</p>
        </section>
    `;
}
