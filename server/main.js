import { serveDir } from "@std/http";

export function server(request) {
    const url = new URL(request.url);

    // Placeholder: this will need to change when we add middleware
    console.log(request.method, url.pathname);

    // Placeholder: this will need to change when we add a router
    if (url.pathname.startsWith("/assets/")) {
        return serveDir(request, {
            fsRoot: "public",
            urlRoot: "assets",
        });
    }

    // Placeholder: this will need to change when we add HTML views
    const headers = new Headers({ "content-type": "text/html" });
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
                <h1>Welcome to Bookshelves</h1>
                <p>Organise your books with bookshelves.</p>
            </body>
        </html>
    `;
    return new Response(document, { headers });
}
