import { html } from "../tools/html.js";
import { canPublishProfile } from "../tools/permissions.js";
import { postButton } from "./partials/postButton.js";

// Placeholder: this will need to change when shelves can be public, and for admins and avatars
export function userView(ctx) {
    const { data: { targetUser }, user: currentUser } = ctx;

    return html`
        <section>
            <header>
                <h1>${targetUser.username}</h1>
            </header>
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
