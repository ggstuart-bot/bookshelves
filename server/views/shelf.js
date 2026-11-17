import { html } from "../tools/html.js";

export function shelfView(ctx) {
    const { params: { shelfId } } = ctx;

    return html`
        <section>
            <header>
                <h1>Shelf ${shelfId}</h1>
            </header>
        </section>
    `;
}
