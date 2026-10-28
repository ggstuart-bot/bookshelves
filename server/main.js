import { serveDir } from "@std/http";
import { layout } from "./views/layout.js";
import { homeView } from "./views/home.js";
import { notFoundView } from "./views/notFound.js";

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
        // Placeholder: this will need to change when we add controllers
        const headers = new Headers({ "content-type": "text/html" });
        return new Response(layout(homeView()), { headers });
    }

    // Placeholder: this will need to change when we add controllers
    const headers = new Headers({ "content-type": "text/html" });
    return new Response(layout(notFoundView()), { headers, status: 404 });
}
