import { html } from "../tools/html.js";

export function bookView(ctx) {
    const { params: { bookId } } = ctx;

    return html`
        <section>
            <header>
                <h1>Book ${bookId}</h1>
            </header>
        </section>
    `;
}
