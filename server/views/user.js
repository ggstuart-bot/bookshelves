import { html } from "../tools/html.js";
import { canPublishProfile } from "../tools/permissions.js";
import { cardGrid } from "./partials/cardGrid.js";
import { postButton } from "./partials/postButton.js";
import { shelfCard } from "./partials/shelfCard.js";

// Placeholder: this will need to change when we add admins and avatars
export function userView(ctx) {
    const { data: { targetUser, publicShelves }, user: currentUser } = ctx;

    return html`
        <section>
            <header>
                <h1>${targetUser.username}</h1>
            </header>
            <h2>Public shelves</h2>
            ${cardGrid(publicShelves.map((shelf) => shelfCard(shelf)), "No public shelves")}
        </section>
        ${canPublishProfile(currentUser, targetUser)
            ? html`<aside>${visibilityForm(targetUser)}</aside>`
            : ""}
    `;
}

function visibilityForm(user) {
    const action = user.isPublic ? "unpublish" : "publish";
    const label = user.isPublic ? "make profile private" : "make profile public";
    return html`
        <h2>Profile is ${user.isPublic ? "public" : "private"}</h2>
        <p>${user.isPublic ? "Anyone" : "Only you"} can see your profile and public shelves</p>
        ${postButton(`/users/${user.id}/${action}`, label)}
    `;
}
