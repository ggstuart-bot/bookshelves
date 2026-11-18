import { html } from "../../tools/html.js";

export function shelfTitleForm(action, title, error, label) {
    return html`
        <form class="secondary" method="POST" action="${action}">
            <label for="title">Title</label>
            <input id="title" name="title" value="${title}"
                aria-describedby="title-error" aria-invalid="${Boolean(error)}">
            <span id="title-error" class="error">${error ?? ""}</span>
            <button>${label}</button>
        </form>
    `;
}
