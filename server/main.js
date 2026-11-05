import { homeController } from "./controllers/home.js";
import { booksController } from "./controllers/books.js";
import { staticController } from "./controllers/static.js";
import { notFoundController } from "./controllers/notFound.js";
import { NotFoundError } from "./tools/errors.js";
import { Router } from "./tools/router.js";

const app = new Router();

app.get("/assets/*", staticController);
app.get("/", homeController);
app.get("/books", booksController);

export function server(request) {
    const url = new URL(request.url);
    const ctx = { request, url, data: {} };

    // Placeholder: this will need to change when we add middleware
    console.log(request.method, url.pathname);

    try {
        return app.handle(ctx);
    } catch (error) {
        if (error instanceof NotFoundError) {
            console.log("Not found:", error.message);
            return notFoundController(ctx);
        }
        throw error;
    }
}
