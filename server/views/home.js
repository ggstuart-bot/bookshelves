import { html } from "../tools/html.js";
import { searchForm } from "./partials/searchForm.js";

export function homeView() {
    return html`
        <section>
            <header>
                <h1>Welcome to Bookshelves</h1>
                <p>Organise your books with bookshelves.</p>
            </header>
            <h2>Find a book</h2>
            ${searchForm()}
        </section>
    `;
}
