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

app.register("/assets/*", staticController);
app.register("/", homeController);
app.register("/books", booksController);
app.register("/books/:bookId", bookController);
app.register("/shelves", shelvesController);
app.register("/shelves/:shelfId", shelfController);

export function server(request) {
    const url = new URL(request.url);
    const ctx = { request, url, data: {} };
    return app.handle(ctx);
}
