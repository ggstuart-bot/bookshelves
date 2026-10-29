import { serveDir } from "@std/http";
import { homeController } from "./controllers/home.js";
import { booksController } from "./controllers/books.js";
import { notFoundController } from "./controllers/notFound.js";

export function server(request) {
    const url = new URL(request.url);
    const ctx = { request };

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
        return homeController();
    }
    if (url.pathname === "/books") {
        return booksController(ctx);
    }
    return notFoundController();
}
