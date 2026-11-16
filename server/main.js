import { serveDir } from "@std/http";
import { layout } from "./views/layout.js";

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
    if (url.pathname === "/") {
        // Placeholder: this will need to change when we add HTML views
        const headers = new Headers({ "content-type": "text/html" });
        const content = `
            <h1>Welcome to Bookshelves</h1>
            <p>Organise your books with bookshelves.</p>
        `;
        return new Response(layout(content), { headers });
    }

    // Placeholder: this will need to change when we add HTML views
    const headers = new Headers({ "content-type": "text/html" });
    const content = `
        <h1>Not found</h1>
        <p>The requested resource was not found.</p>
    `;
    return new Response(layout(content), { headers, status: 404 });
}
