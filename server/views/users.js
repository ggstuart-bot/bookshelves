import { html } from "../tools/html.js";
import { cardGrid } from "./partials/cardGrid.js";
import { postButton } from "./partials/postButton.js";

export function usersView(ctx) {
    const { data: { users } } = ctx;

    return html`
        <section>
            <header>
                <h1>Users</h1>
            </header>
            ${cardGrid(users.map((user) => userCard(user, adminButton(user))), "No users")}
        </section>
    `;
}

// A user as a card in a .grid list.
// Pass extra content (e.g. the admin button) to show it in the card footer
// Placeholder: this will need to change when users have avatars
function userCard(user, footer) {
    return html`
        <li class="card user">
            <div>
                <h2><a href="/users/${user.id}">${user.username}</a></h2>
                <p>
                    ${user.isAdmin ? html`<span class="badge">admin</span>` : ""}
                    <span class="badge">${user.isPublic ? "public" : "private"}</span>
                </p>
                <footer>${footer}</footer>
            </div>
        </li>
    `;
}

function adminButton(user) {
    const action = user.isAdmin ? "demote" : "promote";
    const label = user.isAdmin ? "remove admin" : "make admin";
    return postButton(`/users/${user.id}/${action}`, label);
}
