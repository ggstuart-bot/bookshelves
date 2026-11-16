import { serveDir } from "@std/http";
import { render } from "./tools/render.js";
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
        return render(homeView());
    }

    // Placeholder: this will need to change when we add controllers
    return render(notFoundView(), { status: 404 });
}
