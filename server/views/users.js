import { html } from "../tools/html.js";
import { avatarImage } from "./partials/avatarImage.js";
import { cardGrid } from "./partials/cardGrid.js";

export function usersView(ctx) {
    const { data: { users } } = ctx;

    return html`
        <section>
            <header>
                <h1>Users</h1>
            </header>
            ${cardGrid(users.map((user) => userCard(user)), "No users")}
        </section>
    `;
}

// A user as a card in a .grid list, with their avatar as the picture.
function userCard(user) {
    return html`
        <li class="card user">
            ${avatarImage(user)}
            <div>
                <h2><a href="/users/${user.id}">${user.username}</a></h2>
                <p>
                    ${user.isAdmin ? html`<span class="badge">admin</span>` : ""}
                    <span class="badge">${user.isPublic ? "public" : "private"}</span>
                </p>
            </div>
        </li>
    `;
}
