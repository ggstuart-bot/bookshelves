import { html } from "../tools/html.js";

export function userView(ctx) {
    const { data: { targetUser } } = ctx;

    return html`
        <section>
            <header>
                <h1>${targetUser.username}</h1>
            </header>
        </section>
    `;
}
