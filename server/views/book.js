import { html } from "../tools/html.js";
import { DEFAULT_COVER } from "./partials/bookCard.js";

export function bookView(ctx) {
    const { data: { book } } = ctx;

    return html`
        <section>
            <header>
                <h1>${book.title}</h1>
                <p>by ${book.author}</p>
            </header>
            <div class="row">
                <img class="cover" src="${book.coverUrl ?? DEFAULT_COVER}"
                    alt="Cover of '${book.title}'">
                <div>
                    ${book.year ? html`<p>Published ${book.year}</p>` : ""}
                    <p><a href="/books">Back to all books</a></p>
                </div>
            </div>
        </section>
    `;
}
