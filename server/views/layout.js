// Placeholder: this will need to change when we add ctx
export function layout(content, { title } = {}) {
    const document = `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="utf-8">
                <title>${title ? `${title} | ` : ""}Bookshelves</title>
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <link rel="stylesheet" href="/assets/styles.css">
                <link rel="icon" href="/assets/icon.svg">
            </head>
            <body>
            <header class="secondary">
                <a href="/" class="brand"><img src="/assets/icon.svg" alt=""> Bookshelves</a>
                <nav>
                    <a href="/books">books</a>
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
