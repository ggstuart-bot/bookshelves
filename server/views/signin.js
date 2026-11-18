import { html } from "../tools/html.js";

export function signinView() {
    return html`
        <section>
            <header>
                <h1>Sign in</h1>
                <p>Don't have an account? <a href="/signup">sign up</a> to gain access.</p>
            </header>
            <form class="secondary" method="POST">
                <label for="username">Username</label>
                <input id="username" name="username" autocomplete="username">
                <label for="password">Password</label>
                <input id="password" type="password" name="password" autocomplete="current-password">
                <button>sign in</button>
            </form>
        </section>
    `;
}
