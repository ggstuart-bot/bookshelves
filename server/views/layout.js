// Placeholder: this will need to change when we add flash messages, sign-in and nav highlighting
export function layout(content) {
    const document = `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="utf-8">
                <title>Bookshelves</title>
                <link rel="stylesheet" href="/assets/styles.css">
                <link rel="icon" href="/assets/icon.svg">
            </head>
            <body>
            ${content}
            </body>
        </html>
    `;
    return document;
}
