import { html } from "../tools/html.js";
import { canChangeAdmin } from "../tools/permissions.js";
import { avatarImage } from "./partials/avatarImage.js";
import { cardGrid } from "./partials/cardGrid.js";
import { postButton } from "./partials/postButton.js";

export function usersView(ctx) {
    const { data: { users }, user: currentUser } = ctx;

    return html`
        <section>
            <header>
                <h1>Users</h1>
            </header>
            ${cardGrid(
                users.map((user) =>
                    userCard(user, canChangeAdmin(currentUser, user) ? adminButton(user) : "")
                ),
                "No users",
            )}
        </section>
    `;
}

// A user as a card in a .grid list, with their avatar as the picture.
// Pass extra content (e.g. the admin button) to show it in the card footer
function userCard(user, footer) {
    return html`
        <li class="card user">
            ${avatarImage(user)}
            <div>
                <h2><a href="/users/${user.id}">${user.username}</a></h2>
                <p>
                    ${user.isAdmin ? html`<span class="badge">admin</span>` : ""}
                    <span class="badge">${user.isPublic ? "public" : "private"}</span>
                </p>
                ${footer ? html`<footer>${footer}</footer>` : ""}
            </div>
        </li>
    `;
}

function adminButton(user) {
    const action = user.isAdmin ? "demote" : "promote";
    const label = user.isAdmin ? "remove admin" : "make admin";
    return postButton(`/users/${user.id}/${action}`, label);
}
