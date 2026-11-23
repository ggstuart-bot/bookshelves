import { html } from "../tools/html.js";
import { canChangeAvatar, isSelf } from "../tools/permissions.js";
import { avatarImage } from "./partials/avatarImage.js";
import { cardGrid } from "./partials/cardGrid.js";
import { postButton } from "./partials/postButton.js";
import { shelfCard } from "./partials/shelfCard.js";
import { AVATAR_TYPES } from "../schema/avatar.js";

export function userView(ctx) {
    const { data: { targetUser, shelves, errors }, user: currentUser } = ctx;
    // Only you get controls, so only then is there an aside
    const hasControls = isSelf(currentUser, targetUser);

    return html`
        <section>
            <header>
                <h1>${targetUser.username}</h1>
            </header>
            ${avatarImage(targetUser, `Avatar for '${targetUser.username}'`)}
            <h2>Shelves</h2>
            ${cardGrid(shelves.map((shelf) => shelfCard(shelf)), "No shelves yet")}
        </section>
        ${hasControls
            ? html`
                <aside>
                    ${canChangeAvatar(currentUser, targetUser)
                        ? avatarForm(targetUser, errors)
                        : ""}
                    ${visibilityForm(targetUser)}
                </aside>
            `
            : ""}
    `;
}

function avatarForm(user, errors) {
    return html`
        <h2>Change avatar</h2>
        <form class="secondary" method="POST" action="/users/${user.id}/avatar"
            enctype="multipart/form-data">
            <label for="avatar">Avatar</label>
            <input id="avatar" type="file" name="avatar" accept="${AVATAR_TYPES.join(",")}" required
                aria-describedby="avatar-error" aria-invalid="${Boolean(errors?.avatar)}">
            <span id="avatar-error" class="error">${errors?.avatar ?? ""}</span>
            <button>upload avatar</button>
        </form>
    `;
}

function visibilityForm(user) {
    return html`
        <h2>Profile is ${user.isPublic ? "public" : "private"}</h2>
        <p>${user.isPublic ? "Anyone" : "Only you"} can see your profile</p>
        ${user.isPublic ? "" : postButton(`/users/${user.id}/publish`, "make profile public")}
    `;
}
