import { html } from "../tools/html.js";

// Placeholder: this will need to change when we add publishing, public shelves, admins and avatars
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
