import { homeController } from "./controllers/home.js";
import { bookController, booksController } from "./controllers/books.js";
import { shelfController, shelvesController } from "./controllers/shelves.js";
import { staticController } from "./controllers/static.js";
import { Router } from "./tools/router.js";
import { withLogs } from "./middleware/logging.js";
import { withErrors } from "./middleware/errors.js";

const app = new Router();

app.use(withLogs);
app.use(withErrors);

app.register("GET", "/assets/*", staticController);
app.register("GET", "/", homeController);
app.register("GET", "/books", booksController);
app.register("GET", "/books/:bookId", bookController);
app.register("GET", "/shelves", shelvesController);
app.register("POST", "/shelves", shelvesController);
app.register("GET", "/shelves/:shelfId", shelfController);

export function server(request) {
    const url = new URL(request.url);
    const ctx = { request, url, data: {} };
    return app.handle(ctx);
}
