export function server(request) {
    // Placeholder: this will need to change when we add middleware
    console.log(request.method, request.url);

    // Placeholder: this will need to change when we add HTML views
    const headers = new Headers({ "content-type": "text/html" });
    const document = `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="utf-8">
                <title>Bookshelves</title>
            </head>
            <body>
                <h1>hello world</h1>
            </body>
        </html>
    `;
    return new Response(document, { headers });
}
