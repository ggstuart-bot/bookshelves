// Placeholder: this will need to change when we add flash messages and sign-in
export function layout(content, ctx) {
    const { data, url } = ctx;
    const title = data.title ? `${data.title} | Bookshelves` : "Bookshelves";

    const document = `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="utf-8">
                <title>${title}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <link rel="stylesheet" href="/assets/styles.css">
                <link rel="icon" href="/assets/icon.svg">
            </head>
            <body>
            <header class="secondary">
                <a href="/" class="brand"><img src="/assets/icon.svg" alt=""> Bookshelves</a>
                <nav>
                    ${navLink("/books", "books", url.pathname)}
                </nav>
            </header>
            <main>
            ${content}
            </main>
            <footer class="secondary">
                <p>
                    &copy; Bookshelves developers
                </p>
            </footer>
            </body>
        </html>
    `;
    return document;
}

// A header link, marked as the current page when it matches the path exactly
function navLink(href, content, path) {
    return `<a href="${href}" aria-current="${href === path ? "page" : "false"}">${content}</a>`;
}
