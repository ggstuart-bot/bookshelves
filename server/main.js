import { homeController } from "./controllers/home.js";
import { booksController } from "./controllers/books.js";
import { staticController } from "./controllers/static.js";
import { notFoundController } from "./controllers/notFound.js";
import { NotFoundError } from "./tools/errors.js";
import { Router } from "./tools/router.js";
import { withLogs } from "./middleware/logging.js";

const app = new Router();

app.use(withLogs);

app.register("/assets/*", staticController);
app.register("/", homeController);
app.register("/books", booksController);

export async function server(request) {
    const url = new URL(request.url);
    const ctx = { request, url, data: {} };

    try {
        return await app.handle(ctx);
    } catch (error) {
        if (error instanceof NotFoundError) {
            console.log("Not found:", error.message);
            return notFoundController(ctx);
        }
        throw error;
    }
}
