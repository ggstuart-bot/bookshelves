import { html } from "../tools/html.js";

export function signupView() {
    return html`
        <section>
            <header>
                <h1>Sign up</h1>
            </header>
            <form class="secondary" method="POST">
                <label for="username">Username</label>
                <input id="username" name="username" autocomplete="username">
                <label for="password">Password</label>
                <input id="password" type="password" name="password" autocomplete="new-password">
                <button>sign up</button>
            </form>
        </section>
    `;
}
