import { html } from "../tools/html.js";
import { avatarImage } from "./partials/avatarImage.js";
import { cardGrid } from "./partials/cardGrid.js";
import { shelfCard } from "./partials/shelfCard.js";

export function userView(ctx) {
    const { data: { targetUser, shelves } } = ctx;

    return html`
        <section>
            <header>
                <h1>${targetUser.username}</h1>
            </header>
            ${avatarImage(targetUser, `Avatar for '${targetUser.username}'`)}
            <h2>Shelves</h2>
            ${cardGrid(shelves.map((shelf) => shelfCard(shelf)), "No shelves yet")}
        </section>
    `;
}
