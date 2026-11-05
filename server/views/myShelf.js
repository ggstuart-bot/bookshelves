import { html } from "../tools/html.js";

export function myShelfView(ctx) {
    const { data: { shelf } } = ctx;

    return html`
        <section>
            <header>
                <h1>${shelf.title}</h1>
            </header>
            <p><a href="/shelves">Back to all shelves</a></p>
        </section>
    `;
}
