import { html } from "../tools/html.js";
import { cardGrid } from "./partials/cardGrid.js";
import { shelfCard } from "./partials/shelfCard.js";

const DEFAULT_AVATAR = "/assets/default-avatar.svg";

export function userView(ctx) {
    const { data: { targetUser, shelves } } = ctx;
    // The avatarId in the query string changes with the picture, so a new one is never cached
    const avatarSrc = targetUser.avatarId
        ? `/users/${targetUser.id}/avatar?v=${targetUser.avatarId}`
        : DEFAULT_AVATAR;

    return html`
        <section>
            <header>
                <h1>${targetUser.username}</h1>
            </header>
            <img class="avatar" src="${avatarSrc}" alt="Avatar for '${targetUser.username}'">
            <h2>Shelves</h2>
            ${cardGrid(shelves.map((shelf) => shelfCard(shelf)), "No shelves yet")}
        </section>
    `;
}
