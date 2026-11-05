import { html } from "../tools/html.js";
import { cardGrid } from "./partials/cardGrid.js";

export function usersView(ctx) {
    const { data: { users } } = ctx;

    return html`
        <section>
            <header>
                <h1>Users</h1>
            </header>
            ${cardGrid(users.map(userCard), "No users")}
        </section>
    `;
}

// A user as a card in a .grid list
// Placeholder: this will need to change when users have avatars
function userCard(user) {
    return html`
        <li class="card user">
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
