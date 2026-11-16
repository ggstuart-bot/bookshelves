import { homeController } from "./controllers/home.js";
import { booksController } from "./controllers/books.js";
import { staticController } from "./controllers/static.js";
import { notFoundController } from "./controllers/notFound.js";
import { Router } from "./tools/router.js";

const app = new Router();

app.register("/assets/*", staticController);
app.register("/", homeController);
app.register("/books", booksController);

export function server(request) {
    const url = new URL(request.url);
    const ctx = { request, url };

    // Placeholder: this will need to change when we add middleware
    console.log(request.method, url.pathname);

    return app.handle(ctx) ?? notFoundController();
}
